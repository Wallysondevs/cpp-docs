# std::experimental::filesystem::is_empty

Definido no cabeçalho `[<experimental/filesystem>](<#/doc/header/experimental/filesystem>)`

```c
bool is_empty( const path& p );
bool is_empty( const path& p, error_code& ec );
```

Verifica se o caminho fornecido se refere a um arquivo ou diretório vazio.

A segunda versão retorna false e define ec para um código de erro apropriado se ocorrer um erro. Caso contrário, ec é limpo com uma chamada para ec.clear().

### Parâmetros

- **p** — caminho a ser examinado
- **ec** — código de erro a ser modificado em caso de erro

### Valor de retorno

true se p se refere a um arquivo ou diretório vazio, false caso contrário.

### Exceções

1) filesystem_error se ocorrer um erro. O objeto de exceção é construído com p como argumento. O código de erro é definido para um código de erro apropriado para o erro que causou a falha.

2)

[`noexcept`](<#/doc/language/noexcept_spec>) especificação:

noexcept

### Veja também

| Esta seção está incompleta