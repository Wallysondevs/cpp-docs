# std::error_code::operator=

```cpp
template< class ErrorCodeEnum >
error_code& operator=( ErrorCodeEnum e ) noexcept;  // (1) (desde C++11)
error_code& operator=( const error_code& other ) = default;  // (2) (desde C++11)
(declarado implicitamente)
error_code& operator=( error_code&& other ) = default;  // (3) (desde C++11)
(declarado implicitamente)
```

  
1) Substitui o código de erro e a categoria correspondente pelos que representam o enum de código de erro e.

Equivalente a `*this = make_error_code(e)`, onde `make_error_code` é encontrado apenas por [argument-dependent lookup](<#/doc/language/adl>).

Esta sobrecarga participa da resolução de sobrecarga apenas se [std::is_error_code_enum](<#/doc/error/error_code/is_error_code_enum>)&lt;ErrorCodeEnum&gt;::value for true.

2,3) O operador de atribuição de cópia e o operador de atribuição de movimento definidos implicitamente atribuem o conteúdo de `other` a `*this`.

### Parâmetros

e  |  \-  |  enum de código de erro para construir   
---|---|---
other  |  \-  |  outro código de erro para atribuir   
  
### Valor de retorno

`*this`

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente. 

DR  | Aplicado a  | Comportamento conforme publicado  | Comportamento correto   
---|---|---|---
[LWG 3629](<https://cplusplus.github.io/LWG/issue3629>) | C++11  | apenas sobrecargas de `std::make_error_code` eram usadas  | Sobrecargas encontradas por ADL são usadas   
  
### Veja também

[ assign](<#/doc/error/error_code/assign>) |  atribui outro código de erro   
(função membro pública)  