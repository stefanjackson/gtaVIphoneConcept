local display = false

RegisterCommand("phoneconcept", function(source)
	SetDisplay(not display)
end)

RegisterNUICallback("main", function(data)
	chat(data.text, {0, 255, 0})
	SetDisplay(false)
end)

RegisterNUICallback("error", function(data)
	chat(data.error, {255, 0, 0})
	SetDisplay(false)
end)

RegisterNUICallback("exit", function(data)
	chat("Exited", {0, 255, 0})
	SetDisplay(false)
end)

Citizen.CreateThread(function()
	while display do 
		Citizen.Wait(0)


		DisableControlAction(0, 1, display) -- Look left/right
		DisableControlAction(0, 2, display) --Look up/down
		DisableControlAction(0, 142, display) -- MeleeAttackAlternate
		DisableControlAction(0, 18, display) -- Enter
		DisableControlAction(0, 322, display) -- Esc
		DisableControlAction(0, 106, display) -- Vehicle Mouse Control Override
	end
end)

function SetDisplay(bool)
	display = bool
	SetNuiFocus(bool, bool)
	SendNUIMessage({
		type="ui",
		status = bool,
	})
end

function chat(str, color)
	TriggerEvent("chat:addMessage", {
		color = color,
		multiline = true,
		args = {str}
	})
end
