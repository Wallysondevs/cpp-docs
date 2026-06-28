# std::filesystem::directory_entry::refresh

```cpp
void refresh();  // (1) (desde C++17)
void refresh( std::error_code& ec ) noexcept;  // (2) (desde C++17)
```

Examina o objeto do sistema de arquivos referenciado por esta entrada de diretório e armazena seus atributos para recuperação com [`status`](<#/doc/filesystem/directory_entry/status>), [`exists`](<#/doc/filesystem/directory_entry/exists>), [`is_regular_file`](<#/doc/filesystem/directory_entry/is_regular_file>), e outros acessadores de status.

Se ocorrer um erro, o valor de quaisquer atributos em cache é não especificado.

### Parâmetros

- **ec** — parâmetro de saída para relatório de erro na sobrecarga que não lança exceções

### Valor de retorno

(nenhum)

### Exceções

Qualquer sobrecarga não marcada como `noexcept` pode lançar [std::bad_alloc](<#/doc/memory/new/bad_alloc>) se a alocação de memória falhar.

1) Lança [std::filesystem::filesystem_error](<#/doc/filesystem/filesystem_error>) em erros subjacentes da API do SO, construída com p como o primeiro argumento de caminho e o código de erro do SO como o argumento de código de erro.

2) Define um parâmetro [std::error_code](<#/doc/error/error_code>)& para o código de erro da API do SO se uma chamada de API do SO falhar, e executa ec.[`clear`](<#/doc/error/error_code/clear>)() se nenhum erro ocorrer.

### Observações

Muitas APIs de baixo nível do SO para travessia de diretórios recuperam atributos de arquivo junto com a próxima entrada de diretório. Os construtores e as funções membro não-const de [std::filesystem::directory_iterator](<#/doc/filesystem/directory_iterator>) armazenam esses atributos, se houver, na [std::filesystem::directory_entry](<#/doc/filesystem/directory_entry>) apontada sem chamar `directory_entry::refresh`, o que torna possível examinar os atributos das entradas de diretório enquanto elas estão sendo iteradas, sem fazer chamadas adicionais ao sistema.

### Exemplo

| Esta seção está incompleta
Reason: nenhum exemplo

### Veja também

[ statussymlink_status](<#/doc/filesystem/directory_entry/status>) | status do arquivo designado por esta entrada de diretório; status do arquivo/symlink designado por esta entrada de diretório
(função membro pública)
[ exists](<#/doc/filesystem/directory_entry/exists>) | verifica se a entrada de diretório se refere a um objeto existente do sistema de arquivos
(função membro pública)
[ is_block_file](<#/doc/filesystem/directory_entry/is_block_file>) | verifica se a entrada de diretório se refere a um dispositivo de bloco
(função membro pública)
[ is_character_file](<#/doc/filesystem/directory_entry/is_character_file>) | verifica se a entrada de diretório se refere a um dispositivo de caractere
(função membro pública)
[ is_directory](<#/doc/filesystem/directory_entry/is_directory>) | verifica se a entrada de diretório se refere a um diretório
(função membro pública)
[ is_fifo](<#/doc/filesystem/directory_entry/is_fifo>) | verifica se a entrada de diretório se refere a um pipe nomeado
(função membro pública)
[ is_other](<#/doc/filesystem/directory_entry/is_other>) | verifica se a entrada de diretório se refere a um arquivo _outro_
(função membro pública)
[ is_regular_file](<#/doc/filesystem/directory_entry/is_regular_file>) | verifica se a entrada de diretório se refere a um arquivo regular
(função membro pública)
[ is_socket](<#/doc/filesystem/directory_entry/is_socket>) | verifica se a entrada de diretório se refere a um socket IPC nomeado
(função membro pública)
[ is_symlink](<#/doc/filesystem/directory_entry/is_symlink>) | verifica se a entrada de diretório se refere a um link simbólico
(função membro pública)
[ file_size](<#/doc/filesystem/directory_entry/file_size>) | retorna o tamanho do arquivo ao qual a entrada de diretório se refere
(função membro pública)
[ hard_link_count](<#/doc/filesystem/directory_entry/hard_link_count>) | retorna o número de hard links que se referem ao arquivo ao qual a entrada de diretório se refere
(função membro pública)
[ last_write_time](<#/doc/filesystem/directory_entry/last_write_time>) | obtém o tempo da última modificação de dados do arquivo ao qual a entrada de diretório se refere
(função membro pública)