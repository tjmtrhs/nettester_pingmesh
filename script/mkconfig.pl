#!/usr/bin/env perl

print <<'EOM';
var tester_sets = {
  tester: '127.0.0.1',
}

var hosts = {
EOM

for($i=0;$i<32;$i++){
    $node = "n" . ($i<10 ? "0" : "") . $i;
    $ip = $i+128;
    $mac = $i+20;
    $vpn = $i+20;
    $ppn = $i+20;
print <<"EOM";    
  $node: {
    tester_set: tester_sets['tester'],
    host_info: {
      ip_address: '192.168.0.$ip',
      mac_address: '00:00:5E:00:53:$mac',
      netmask: '255.255.255.0',
      gateway: '192.168.0.254',
      virtual_port_number: $vpn,
      physical_port_number: $ppn
    },
  },
EOM
}

print <<'EOM';
}

exports.tester_sets = tester_sets;
exports.hosts = hosts;
EOM
