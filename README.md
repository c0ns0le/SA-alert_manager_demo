# Supporting Add-on for Alert Manager Demo Data
- **Authors**:		Simon Balz <simon@balz.me>, Mika Borner <mika.borner@gmail.com>
- **Description**:	Supporting Add-on for Alert Manager Demo Data (https://github.com/simcen/alert_manager)
- **Version**: 		0.1

## Changelog
- **2014-12-24** simon@balz.me
	- Better sample data
	- Added more sample alerts
    - Added setup view to load static data and enable/disable demo alerts
- **2014-12-23** simon@balz.me
	- Added initial demo data, demo alerts
	- Added load data search

## Release Notes

## Credits

## Prerequisites
- Splunk v6.2 and above

## Usage
### Deployment Matrix

<table>
	<tr>
		<td></td>
		<td>Alert Manager</td>
		<td>Add-on for Alert Manager</td>
	</tr>
    <tr>
        <td>Search Head</td>
        <td>x</td>
        <td>x</td>
    </tr>
    <tr>
    	<td>Indexer</td>
    	<td></td>
    	<td>x</td>
    </tr>
</table>

**Note:** If you forward events from the search head trough heavy forwarder to the indexer, install the Add-on on the heavy forwarder and disable the index.

### Installation
1. Unpack and install app to $SPLUNK_HOME/etc/apps
2. Restart Splunk

## Known Issues
- n/a

## License
- **This work is licensed under a Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License.**
- Details: <http://creativecommons.org/licenses/by-nc-sa/4.0/>
