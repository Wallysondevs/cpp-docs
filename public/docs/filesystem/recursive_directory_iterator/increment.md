# std::filesystem::recursive_directory_iterator::operator++, std::filesystem::recursive_directory_iterator::increment

```cpp
recursive_directory_iterator& operator++();  // (1) (desde C++17)
recursive_directory_iterator& increment( std::error_code& ec );  // (2) (desde C++17)
```

  
Avança o iterator para a próxima entrada. Invalida todas as cópias do valor anterior de *this.

Se não houver mais entradas restantes no diretório atualmente iterado, a iteração é retomada sobre o diretório pai. O processo é repetido se o diretório pai não tiver entradas irmãs que possam ser iteradas. Se o pai da hierarquia de diretórios que foi iterada recursivamente for alcançado (não há entradas candidatas em depth() == 0), *this é definido como um iterator de fim.

Caso contrário, se *this se refere a um diretório, ele é iterado se as seguintes condições forem atendidas:

  * [disable_recursion_pending()](<#/doc/filesystem/recursive_directory_iterator/disable_recursion_pending>) não foi chamado antes deste incremento, ou seja, recursion_pending() == true.
  * O diretório não é um symlink ou o seguimento de symlinks está habilitado, ou seja, pelo menos uma das seguintes é verdadeira:
    * !is_symlink((*this)->symlink_status()).
    * (options() & directory_options::follow_directory_symlink) != directory_options::none)

### Parâmetros

ec  |  \-  |  código de erro para armazenar o status do erro   
  
### Valor de retorno

*this

### Exceções

Qualquer sobrecarga não marcada como `noexcept` pode lançar [std::bad_alloc](<#/doc/memory/new/bad_alloc>) se a alocação de memória falhar.

1) Lança [std::filesystem::filesystem_error](<#/doc/filesystem/filesystem_error>) em erros subjacentes da API do SO, construída com o código de erro do SO como argumento do código de erro.

2) Define um parâmetro [std::error_code](<#/doc/error/error_code>)& para o código de erro da API do SO se uma chamada da API do SO falhar, e executa ec.[`clear`](<#/doc/error/error_code/clear>)() se nenhum erro ocorrer.

### Exemplo

| Esta seção está incompleta  
Razão: nenhum exemplo   
  
### Relatórios de defeitos

Os seguintes relatórios de defeitos que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR  | Aplicado a  | Comportamento conforme publicado  | Comportamento correto   
---|---|---|---
[LWG 3013](<https://cplusplus.github.io/LWG/issue3013>) | C++17  | sobrecarga de `error_code` marcada como `noexcept` mas pode alocar memória  | `noexcept` removido 