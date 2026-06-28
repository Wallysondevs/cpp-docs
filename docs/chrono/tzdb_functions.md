# std::chrono::get_tzdb_list, std::chrono::get_tzdb, std::chrono::remote_version, std::chrono::reload_tzdb

```cpp
std::chrono::tzdb_list& get_tzdb_list();  // (1) (desde C++20)
const std::chrono::tzdb& get_tzdb();  // (2) (desde C++20)
std::string remote_version();  // (3) (desde C++20)
const std::chrono::tzdb& reload_tzdb();  // (4) (desde C++20)
```

  
Essas funções fornecem acesso ao banco de dados de fuso horário de todo o programa.

1) Retorna uma referência para o singleton global std::chrono::tzdb_list. Se este for o primeiro acesso ao banco de dados, inicialize o banco de dados. Após a inicialização, o banco de dados conterá um único objeto std::chrono::tzdb inicializado. Esta função é thread-safe: chamadas concorrentes a esta função de múltiplas threads não introduzem uma condição de corrida (data race).

2) Retorna uma referência para o primeiro objeto std::chrono::tzdb mantido pelo singleton `tzdb_list`. Equivalente a std::chrono::get_tzdb_list().front().

3) Retorna uma string contendo a versão mais recente do banco de dados remoto.

4) Se remote_version() != get_tzdb().version, insere um novo objeto `tzdb` representando o banco de dados remoto no início do singleton `tzdb_list` referenciado por `get_tzdb_list()`. Caso contrário, não há efeitos. Nenhuma referência, ponteiro ou iterator é invalidado. Chamar esta função concorrentemente com get_tzdb_list().front() ou get_tzdb_list().erase_after() não introduz uma condição de corrida (data race).

### Exceções 

1) [std::runtime_error](<#/doc/error/runtime_error>) se por qualquer motivo uma referência a uma `tzdb_list` contendo um ou mais `tzdb` válidos não puder ser retornada.

### Valor de retorno 

1) Uma referência para o singleton global std::chrono::tzdb_list.

2) std::chrono::get_tzdb_list().front().

3) Uma string contendo a versão mais recente do banco de dados remoto.

4) std::chrono::get_tzdb_list().front() (após qualquer atualização feita por esta função).