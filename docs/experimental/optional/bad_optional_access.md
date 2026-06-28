# std::experimental::bad_optional_access

Definido no header `[<experimental/optional>](<#/doc/header/experimental/optional>)`

```cpp
class bad_optional_access;
```

  
Define um tipo de objeto a ser lançado por [`std::experimental::optional::value`](<#/doc/experimental/optional/value>) ao acessar um objeto optional que não contém um valor.

Diagrama de herança

### Funções membro

(construtor) |  constrói um novo objeto `bad_optional_access`   
(função membro pública)  
operator= |  substitui o objeto `bad_optional_access`   
(função membro pública)  
what |  retorna a string explicativa   
(função membro pública)  
  
##  std::experimental::bad_optional_access::bad_optional_access

bad_optional_access() noexcept; |  (1)  |  (library fundamentals TS)  
---|---|---
bad_optional_access( const bad_optional_access& other ) noexcept; |  (2)  |  (library fundamentals TS)  

  
Constrói um novo objeto `bad_optional_access` com uma string de bytes terminada em nulo definida pela implementação, que é acessível através de [`what()`](<#/doc/error/exception/what>).

1) Construtor padrão.

2) Construtor de cópia. Se *this e other ambos tiverem o tipo dinâmico `std::experimental::bad_optional_access`, então [std::strcmp](<#/doc/string/byte/strcmp>)(what(), other.what()) == 0.

###  Parâmetros

other  |  \-  |  outro objeto de exceção para copiar   
  
##  std::experimental::bad_optional_access::operator=

bad_optional_access& operator=( const bad_optional_access& other ) noexcept; |  |  (library fundamentals TS)  

  
Atribui o conteúdo com o de other. Se *this e other ambos tiverem o tipo dinâmico `std::experimental::bad_optional_access`, então [std::strcmp](<#/doc/string/byte/strcmp>)(what(), other.what()) == 0 após a atribuição.

###  Parâmetros

other  |  \-  |  outro objeto de exceção para atribuir   
  
###  Valor de retorno

*this

##  std::experimental::bad_optional_access::what

virtual const char* what() const noexcept; |  | (library fundamentals TS)  

  
Retorna a string explicativa.

###  Valor de retorno

Ponteiro para uma string terminada em nulo, definida pela implementação, com informações explicativas. A string é adequada para conversão e exibição como uma [std::wstring](<#/doc/string/basic_string>). O ponteiro tem garantia de ser válido pelo menos até que o objeto de exceção do qual ele é obtido seja destruído, ou até que uma função membro não-const (por exemplo, operador de atribuição de cópia) no objeto de exceção seja chamada.

A string retornada é codificada com a codificação literal comum durante a avaliação em tempo de compilação.  | (desde C++26)  
  
###  Notas

As implementações são permitidas, mas não obrigadas, a sobrescrever `what()`.

##  Herdado de [std::logic_error](<#/doc/error/logic_error>)

##  Herdado de [std::exception](<#/doc/error/exception>)

###  Funções membro

[ (destructor)](<#/doc/error/exception/~exception>)[virtual] |  destrói o objeto de exceção   
(função membro pública virtual de `std::exception`)  
[ what](<#/doc/error/exception/what>)[virtual] |  retorna uma string explicativa   
(função membro pública virtual de `std::exception`)