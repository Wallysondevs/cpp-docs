# std::experimental::filesystem::path::make_preferred

path& make_preferred() | (1) | (filesystem TS)

Converte todos os separadores de diretório no path para o separador de diretório preferencial.

Por exemplo, em sistemas onde `\` é o separador preferencial, o path `foo/bar` será convertido para `foo\bar`.

### Parâmetros

(nenhum)

### Valor de retorno

*this

### Exceções

Pode lançar exceções definidas pela implementação.

### Veja também

| Esta seção está incompleta