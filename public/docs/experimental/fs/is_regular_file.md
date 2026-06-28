# std::experimental::filesystem::is_regular_file

Definido no cabeçalho `[<experimental/filesystem>](<#/doc/header/experimental/filesystem>)`

```c
bool is_regular_file( file_status s );
bool is_regular_file( const path& p );
bool is_regular_file( const path& p, error_code& ec );
```

Verifica se o status de arquivo ou caminho fornecido corresponde a um arquivo regular.

1) Equivalente a s.type() == file_type::regular.

2) Equivalente a is_regular_file(status(p)).

3) Equivalente a is_regular_file(status(p, ec)). Retorna false e define ec para um código de erro apropriado se ocorrer um erro. Caso contrário, ec é limpo com uma chamada para ec.clear().

| Esta seção está incompleta
Razão: a especificação diz que (2) lança filesystem_error se status(p) lançaria filesystem_error. Isso é diferente do restante das funções is_**_file. Isso está correto e, em caso afirmativo, qual é a justificativa?

### Parâmetros

- **s** — status de arquivo a ser verificado
- **p** — caminho a ser examinado
- **ec** — código de erro para armazenar o status do erro

### Valor de retorno

true se o caminho ou status de arquivo fornecido corresponder a um link regular, false caso contrário.

### Exceções

1,3)

Especificação [`noexcept`](<#/doc/language/noexcept_spec>):

noexcept

2) Lança filesystem_error se ocorrer um erro. O erro é construído com p como argumento. O código de erro é definido para um código de erro apropriado para o erro que causou a falha.

### Veja também

| Esta seção está incompleta