local setInterval = require(script.Parent.Intervals)
local Base64 = require(script.Parent.Base64)
local atob = Base64.atob
local btoa = Base64.btoa
local messages = {}

local function notExists(whichArray, itemName)
	if (table.find(whichArray, itemName)) then
		return false
	else
		return true
	end
end

local function notEmpty(s)
	return s ~= nil or s ~= '' or s ~= " "
end

local ws = function (dict)
	local onMessage = dict.onMessage or function(msg)
		print(msg)
	end
	local server = game:GetService('HttpService')
	local id = server:GetAsync("https://unisock.seven7four4.repl.co/api/connect/"..btoa(dict.url))
	local function sendMessage(msg)
		wait(1)
		server:GetAsync("https://unisock.seven7four4.repl.co/api/send/"..id.."/"..btoa(msg))
	end
	
	local loop = coroutine.create(function()
		while wait(50 / 1000) do 
			local msg = server:GetAsync("https://unisock.seven7four4.repl.co/api/poll/"..id)
			if notExists(messages, msg) then
				table.insert(messages, msg)
				if notEmpty(msg) then
					onMessage(msg)
				end
			end
		end
	end)
	coroutine.resume(loop)
	return {
		sendMessage = sendMessage,
		onMessage = onMessage
	}
end

return ws
