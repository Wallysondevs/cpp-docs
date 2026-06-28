# std::experimental::any::type

const type_info& type() const noexcept; | | (library fundamentals TS)

Consulta o tipo contido.

### Parâmetros

(nenhum)

### Valor de retorno

O `typeid` do valor contido se a instância não estiver vazia, caso contrário `typeid(void)`.