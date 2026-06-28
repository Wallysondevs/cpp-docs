# std::logic_error

Definido no header `[<stdexcept>](<#/doc/header/stdexcept>)`

```cpp
class logic_error;
```

  
Define um tipo de objeto a ser lançado como exceção. Ele reporta erros que são uma consequência de lógica falha dentro do programa, como a violação de pré-condições lógicas ou invariantes de classe, e que podem ser evitados. 

Nenhum componente da standard library lança esta exceção diretamente, mas os tipos de exceção [std::invalid_argument](<#/doc/error/invalid_argument>), [std::domain_error](<#/doc/error/domain_error>), [std::length_error](<#/doc/error/length_error>), [std::out_of_range](<#/doc/error/out_of_range>), [std::future_error](<#/doc/thread/future_error>), e [`std::experimental::bad_optional_access`](<#/doc/experimental/optional/bad_optional_access>) são derivados de `std::logic_error`. 

Diagrama de herança

### Funções membro

(construtor) |  constrói um novo objeto `logic_error` com a mensagem fornecida   
(função membro pública)  
operator= |  substitui o objeto `logic_error`   
(função membro pública)  
  
##  std::logic_error::logic_error

```cpp
logic_error( const std::string& what_arg );  // (1)
logic_error( const char* what_arg );  // (2)
logic_error( const logic_error& other ); |  (3)  |  (noexcept desde C++11)
```

  
1) Constrói o objeto de exceção com what_arg como string explicativa. Após a construção, [std::strcmp](<#/doc/string/byte/strcmp>)(what(), what_arg.c_str()) == 0.

2) Constrói o objeto de exceção com what_arg como string explicativa. Após a construção, [std::strcmp](<#/doc/string/byte/strcmp>)(what(), what_arg) == 0.

3) Construtor de cópia. Se *this e other ambos tiverem o tipo dinâmico `std::logic_error`, então [std::strcmp](<#/doc/string/byte/strcmp>)(what(), other.what()) == 0. Nenhuma exceção pode ser lançada a partir do construtor de cópia.

###  Parâmetros

what_arg  |  \-  |  string explicativa   
---|---|---
other  |  \-  |  outro objeto de exceção para copiar   
  
###  Exceções

1,2) Pode lançar [std::bad_alloc](<#/doc/memory/new/bad_alloc>).

###  Notas

Como a cópia de `std::logic_error` não é permitida a lançar exceções, esta mensagem é tipicamente armazenada internamente como uma string com contagem de referências alocada separadamente. É também por isso que não existe um construtor que aceite `std::string&&`: ele teria que copiar o conteúdo de qualquer forma. 

Antes da resolução do [LWG issue 254](<https://cplusplus.github.io/LWG/issue254>), o construtor não-cópia só podia aceitar [std::string](<#/doc/string/basic_string>). Isso tornava a alocação dinâmica obrigatória para construir um objeto [std::string](<#/doc/string/basic_string>). 

Após a resolução do [LWG issue 471](<https://cplusplus.github.io/LWG/issue471>), uma classe de exceção padrão derivada deve ter um construtor de cópia publicamente acessível. Ele pode ser implicitamente definido desde que as strings explicativas obtidas por `what()` sejam as mesmas para o objeto original e o objeto copiado. 

##  std::logic_error::operator=

logic_error& operator=( const logic_error& other ); |  |  (noexcept desde C++11)  

  
Atribui o conteúdo com o de other. Se *this e other ambos tiverem o tipo dinâmico `std::logic_error`, então [std::strcmp](<#/doc/string/byte/strcmp>)(what(), other.what()) == 0 após a atribuição. Nenhuma exceção pode ser lançada a partir do operador de atribuição de cópia. 

###  Parâmetros

other  |  \-  |  outro objeto de exceção para atribuir   
  
###  Valor de retorno

*this

###  Notas

Após a resolução do [LWG issue 471](<https://cplusplus.github.io/LWG/issue471>), uma classe de exceção padrão derivada deve ter um operador de atribuição de cópia publicamente acessível. Ele pode ser implicitamente definido desde que as strings explicativas obtidas por `what()` sejam as mesmas para o objeto original e o objeto copiado. 

##  Herdado de [std::exception](<#/doc/error/exception>)

###  Funções membro

[ (destrutor)](<#/doc/error/exception/~exception>)[virtual] |  destrói o objeto de exceção   
(função membro pública virtual de `std::exception`)  
[ what](<#/doc/error/exception/what>)[virtual] |  retorna uma string explicativa   
(função membro pública virtual de `std::exception`)  
  
### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente. 

DR  | Aplicado a  | Comportamento conforme publicado  | Comportamento correto   
---|---|---|---
[LWG 254](<https://cplusplus.github.io/LWG/issue254>) | C++98  | o construtor que aceita const char* estava faltando  | adicionado   
[LWG 471](<https://cplusplus.github.io/LWG/issue471>) | C++98  | as strings explicativas das cópias de `std::logic_error` eram definidas pela implementação  | elas são as mesmas do objeto `std::logic_error` original 