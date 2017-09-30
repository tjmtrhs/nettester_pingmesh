var tester_sets = {
  st01: '127.0.0.1',
  st02: '127.0.0.1',
  st03: '127.0.0.1',
  st04: '127.0.0.1',
  st05: '127.0.0.1',
  st06: '127.0.0.1',
}

var hosts = {
  st011: {
    tester_set: tester_sets['st01'],
    host_info: {
      ip_address: '192.168.0.1',
      mac_address: '00:00:5E:00:53:01',
      netmask: '255.255.255.0',
      gateway: '192.168.0.254',
      virtual_port_number: 2,
      physical_port_number: 2
    },
  },
  st012: {
    tester_set: tester_sets['st01'],
    host_info: {
      ip_address: '192.168.0.2',
      mac_address: '00:00:5E:00:53:02',
      netmask: '255.255.255.0',
      gateway: '192.168.0.254',
      virtual_port_number: 3,
      physical_port_number: 3
    },
  },
  st021: {
    tester_set: tester_sets['st02'],
    host_info: {
      ip_address: '192.168.0.3',
      mac_address: '00:00:5E:00:53:03',
      netmask: '255.255.255.0',
      gateway: '192.168.0.254',
      virtual_port_number: 4,
      physical_port_number: 4
    },
  },
  st022: {
    tester_set: tester_sets['st02'],
    host_info: {
      ip_address: '192.168.0.4',
      mac_address: '00:00:5E:00:53:04',
      netmask: '255.255.255.0',
      gateway: '192.168.0.254',
      virtual_port_number: 5,
      physical_port_number: 5
    },
  },
  st031: {
    tester_set: tester_sets['st03'],
    host_info: {
      ip_address: '192.168.0.5',
      mac_address: '00:00:5E:00:53:05',
      netmask: '255.255.255.0',
      gateway: '192.168.0.254',
      virtual_port_number: 6,
      physical_port_number: 6
    },
  },
  st032: {
    tester_set: tester_sets['st03'],
    host_info: {
      ip_address: '192.168.0.6',
      mac_address: '00:00:5E:00:53:06',
      netmask: '255.255.255.0',
      gateway: '192.168.0.254',
      virtual_port_number: 7,
      physical_port_number: 7
    },
  },
  st041: {
    tester_set: tester_sets['st04'],
    host_info: {
      ip_address: '192.168.0.7',
      mac_address: '00:00:5E:00:53:07',
      netmask: '255.255.255.0',
      gateway: '192.168.0.254',
      virtual_port_number: 8,
      physical_port_number: 8
    },
  },
  st042: {
    tester_set: tester_sets['st04'],
    host_info: {
      ip_address: '192.168.0.8',
      mac_address: '00:00:5E:00:53:08',
      netmask: '255.255.255.0',
      gateway: '192.168.0.254',
      virtual_port_number: 9,
      physical_port_number: 9
    },
  },
  st051: {
    tester_set: tester_sets['st05'],
    host_info: {
      ip_address: '192.168.0.9',
      mac_address: '00:00:5E:00:53:09',
      netmask: '255.255.255.0',
      gateway: '192.168.0.254',
      virtual_port_number: 10,
      physical_port_number: 10
    },
  },
  st052: {
    tester_set: tester_sets['st05'],
    host_info: {
      ip_address: '192.168.0.10',
      mac_address: '00:00:5E:00:53:0A',
      netmask: '255.255.255.0',
      gateway: '192.168.0.254',
      virtual_port_number: 11,
      physical_port_number: 11
    },
  },
  st061: {
    tester_set: tester_sets['st06'],
    host_info: {
      ip_address: '192.168.0.11',
      mac_address: '00:00:5E:00:53:0B',
      netmask: '255.255.255.0',
      gateway: '192.168.0.254',
      virtual_port_number: 12,
      physical_port_number: 12
    },
  },
  st062: {
    tester_set: tester_sets['st06'],
    host_info: {
      ip_address: '192.168.0.12',
      mac_address: '00:00:5E:00:53:0C',
      netmask: '255.255.255.0',
      gateway: '192.168.0.254',
      virtual_port_number: 13,
      physical_port_number: 13
    },
  },
}

exports.tester_sets = tester_sets;
exports.hosts = hosts;
