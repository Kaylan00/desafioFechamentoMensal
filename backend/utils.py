def formatar_valor(valor):
    return f"R$ {valor:,.2f}".replace(",", "X").replace(".", ",").replace("X", ".")

def calcular_comissoes(reservas, property_id, mes):
    ota_total = 0
    host_total = 0
    propriedade_total = 0
    seazone_total = 0
    reservas_validas = 0  

    for reserva in reservas:
        # verificando se o id da propriedade e o mês são válidos além disso o status tem que estar como ativo
        if reserva.get('property_id') == property_id and reserva.get('cash_date', '').startswith(mes):
            if reserva.get('status') == 'active':
                reservas_validas += 1
                ota_commission = reserva['reservation_value'] * reserva['ota_fee']
                host_commission = reserva['cleaning_value'] + ((reserva['reservation_value'] - ota_commission - reserva['cleaning_value']) * reserva['host_fee'])
                property_commission = (reserva['reservation_value'] - ota_commission - reserva['cleaning_value']) * reserva['property_fee']
                seazone_commission = (reserva['reservation_value'] - ota_commission - reserva['cleaning_value']) * (1 - reserva['property_fee'] - reserva['host_fee'])

                ota_total += ota_commission
                host_total += host_commission
                propriedade_total += property_commission
                seazone_total += seazone_commission

    # se não tiver reservas ativas válidas
    if reservas_validas == 0:
        print("Nenhuma reserva válida encontrada para o ID da propriedade e mês especificado.")
        return {"message": "Nenhuma reserva válida encontrada para o ID da propriedade e mês especificado."}

    return {
        "ota_commission": formatar_valor(ota_total),
        "host_commission": formatar_valor(host_total),
        "property_commission": formatar_valor(propriedade_total),
        "seazone_commission": formatar_valor(seazone_total)
    }
