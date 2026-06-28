# std::filesystem::status_known

Definido no cabeçalho `[<filesystem>](<#/doc/header/filesystem>)`

```c
bool status_known( std::filesystem::file_status s ) noexcept;
```

Verifica se o status de arquivo fornecido é conhecido, equivalente a s.type() != file_type::none.

### Parâmetros

- **s** — status de arquivo a ser verificado

### Valor de retorno

true se o status de arquivo fornecido for um status de arquivo conhecido.

### Notas

Apesar do nome, a função verifica o status de arquivo de [file_type::none](<#/doc/filesystem/file_type>) (significando que ocorreu um erro), não [file_type::unknown](<#/doc/filesystem/file_type>) (significando que o arquivo existe, mas seu tipo não pode ser determinado).

### Veja também

[ statussymlink_status](<#/doc/filesystem/status>)(C++17)(C++17) | determina atributos de arquivo
determina atributos de arquivo, verificando o alvo do symlink
(função)
[ statussymlink_status](<#/doc/filesystem/directory_entry/status>) | status do arquivo designado por esta entrada de diretório;
status do arquivo/symlink designado por esta entrada de diretório
(função membro pública de `std::filesystem::directory_entry`)