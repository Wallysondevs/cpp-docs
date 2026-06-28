# std::experimental::filesystem::status_known

Definido no cabeçalho `[<experimental/filesystem>](<#/doc/header/experimental/filesystem>)`

```c
bool status_known( file_status s );
```

Verifica se o status de arquivo fornecido é conhecido. Equivalente a s.type() != file_type::none.

### Parâmetros

- **s** — status de arquivo a verificar

### Valor de retorno

true se o status de arquivo fornecido for um status de arquivo desconhecido.

### Exceções

Especificação [`noexcept`](<#/doc/language/noexcept_spec>):

noexcept

### Notas

Apesar do nome, a função verifica o status de arquivo `file_type::none` (significando que ocorreu um erro), e não `file_type::unknown` (significando que o arquivo existe, mas seu tipo não pode ser determinado).

### Veja também

[ statussymlink_status](<#/doc/experimental/fs/status>) | determina atributos de arquivo
determina atributos de arquivo, verificando o alvo do symlink
(função)
[ statussymlink_status](<#/doc/experimental/fs/directory_entry/status>) | status em cache do arquivo designado por esta entrada de diretório
symlink_status em cache do arquivo designado por esta entrada de diretório
(função membro pública de `std::experimental::filesystem::directory_entry`)