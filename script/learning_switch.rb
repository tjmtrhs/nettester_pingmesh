require 'fdb'
require 'rmagick'

# An OpenFlow controller that emulates a layer-2 switch.
class LearningSwitch < Trema::Controller
  def start(_argv)
    @fdb = FDB.new
    logger.info "#{name} started."
    @latency_map = load_bitmap_image('img.bmp')
  end

  def packet_in(_datapath_id, packet_in)
    return if packet_in.destination_mac.reserved?
    @fdb.learn packet_in.source_mac, packet_in.in_port
    flow_mod_and_packet_out packet_in
  end

  private

  def flow_mod_and_packet_out(packet_in)
    port_no = @fdb.lookup(packet_in.destination_mac)

    unless port_no
      packet_out(packet_in, :flood)
    else
      begin
        request = Pio::Icmp.read(packet_in.raw_data)
        src = request.source_ip_address.to_i & 255 - 128
        dst = request.destination_ip_address.to_i & 255 - 128
        wait = @latency_map[src*32 + dst]
        if (wait == 0)
          send_flow_mod_add(
            packet_in.datapath_id,
            match: Match.new(:in_port => packet_in.in_port, :ether_type => 0x0800, :source_ip_address => request.source_ip_address, :destination_ip_address => request.destination_ip_address),
            actions: SendOutPort.new(port_no)
          )
          packet_out(packet_in, port_no)
        elsif (wait == -1)
          send_flow_mod_add(
            packet_in.datapath_id,
            match: Match.new(:in_port => packet_in.in_port, :ether_type => 0x0800, :source_ip_address => request.source_ip_address, :destination_ip_address => request.destination_ip_address),
          )
          packet_drop(packet_in)
        else
          sleep(wait)
          packet_out(packet_in, port_no)
        end
      rescue => e
        packet_out(packet_in, port_no)
      end
    end
  end
  
  def packet_out(packet_in, port_no)
    send_packet_out(
      packet_in.datapath_id,
      packet_in: packet_in,
      actions: SendOutPort.new(port_no)
    )
  end

  def packet_drop(packet_in)
    send_packet_out(
      packet_in.datapath_id,
      packet_in: packet_in
    )
  end

  def load_bitmap_image(filepath)
    # ref. http://blog.livedoor.jp/itukano/archives/51838000.html
    bitmap = []
    img = Magick::ImageList.new(filepath)
    img.rows.times do |row|
      img.columns.times do |col|
        px = img.export_pixels(col, row, 1, 1)
        if (px[0] == 0 && px[1] == 0 && px[2] == 0)
          bitmap << -1
        elsif (px[0] & 255 == 255 && px[1] & 255 == 4 && px[2] & 255 == 4)
          bitmap << 0.06
        else
          bitmap << 0
        end
      end
    end
    bitmap
  end
end
