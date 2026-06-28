# std::experimental::filesystem::recursive_directory_iterator::operator++, increment

recursive_directory_iterator& operator++(); |  |  (filesystem TS)  
---|---|---
recursive_directory_iterator& increment( error_code& ec ); |  |  (filesystem TS)  

  
Avança o iterator para a próxima entrada.

Se não houver mais entradas restantes no diretório atualmente iterado, a iteração é retomada sobre o diretório pai. O processo é repetido se o diretório pai não tiver entradas irmãs que possam ser iteradas. Se o pai da hierarquia de diretórios que foi iterada recursivamente for alcançado (não há entradas candidatas em depth() == 0), *this é definido como um end iterator.

Caso contrário, se *this se referir a um diretório, ele será iterado se as seguintes condições forem atendidas:

  * [disable_recursion_pending()](<#/doc/experimental/fs/recursive_directory_iterator/disable_recursion_pending>) não foi chamado antes deste incremento, ou seja, recursion_pending() == true.
  * O diretório não é um symlink ou o seguimento de symlinks está habilitado, ou seja,

     !is_symlink(this->symlink_status())
(options() & directory_options::follow_directory_symlink) != 0).

### Parâmetros

ec  |  \-  |  código de erro para armazenar o status do erro   
  
### Valor de retorno

*this

### Exceções

1) filesystem_error se ocorrer um erro. O código de erro é definido para um código de erro apropriado para o erro que causou a falha.

2)

Especificação [`noexcept`](<#/doc/language/noexcept_spec>): 

noexcept