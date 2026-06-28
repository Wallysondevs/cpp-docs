# std::error_condition::operator=

```cpp
template< class ErrorConditionEnum >
error_condition& operator=( ErrorConditionEnum e ) noexcept;  // (1) (desde C++11)
error_condition& operator=( const error_condition& other ) = default;  // (2) (desde C++11)
(declarado implicitamente)
error_condition& operator=( error_condition&& other ) = default;  // (3) (desde C++11)
(declarado implicitamente)
```

  
Atribui conteúdo a uma condição de erro.

1) Atribui a condição de erro para o enum `e`. Efetivamente chama `make_error_condition` que é encontrado apenas por [argument-dependent lookup](<#/doc/language/adl>) para `e` e então substitui *this pelo resultado. Esta sobrecarga participa da resolução de sobrecarga somente se [std::is_error_condition_enum](<#/doc/error/error_condition/is_error_condition_enum>)&lt;ErrorConditionEnum&gt;::value for true.

2,3) O operador de atribuição de cópia e o operador de atribuição de movimento definidos implicitamente atribuem o conteúdo de `other` a *this.

### Parâmetros

e  |  \-  |  enum de condição de erro   
---|---|---
other  |  \-  |  outra condição de erro para atribuir   
  
### Valor de retorno

*this.

### Relatórios de Defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR  | Aplicado a  | Comportamento conforme publicado  | Comportamento correto   
---|---|---|---
[LWG 3629](<https://cplusplus.github.io/LWG/issue3629>) | C++11  | apenas sobrecargas de `std::make_error_condition` eram usadas  | sobrecargas encontradas por ADL são usadas 