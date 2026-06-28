# std::experimental::any_cast

template&lt;class ValueType&gt;  
ValueType any_cast(const any& operand); |  (1)  |  (library fundamentals TS)  
template&lt;class ValueType&gt;  
ValueType any_cast(any& operand); |  (2)  |  (library fundamentals TS)  
template&lt;class ValueType&gt;  
ValueType any_cast(any&& operand); |  (3)  |  (library fundamentals TS)  
template&lt;class ValueType&gt;  
const ValueType* any_cast(const any* operand) noexcept; |  (4)  |  (library fundamentals TS)  
template&lt;class ValueType&gt;  
ValueType* any_cast(any* operand) noexcept; |  (5)  |  (library fundamentals TS)  

  
Realiza acesso type-safe ao objeto contido.

Para (1-3), o programa é malformado se `ValueType` não for uma referência e [std::is_copy_constructible](<#/doc/types/is_copy_constructible>)&lt;ValueType&gt;::value for falso.

### Parâmetros

operand  |  \-  |  objeto `any` alvo   
  
### Valor de retorno

1) Retorna *any_cast<[std::add_const_t](<#/doc/types/add_cv>)<[std::remove_reference_t](<#/doc/types/remove_reference>)&lt;ValueType&gt;>>(&operand).

2,3) Retorna *any_cast<[std::remove_reference_t](<#/doc/types/remove_reference>)&lt;ValueType&gt;>(&operand).

4,5) Se operand não for um ponteiro nulo, e o `typeid` do `ValueType` solicitado corresponder ao do conteúdo de operand, um ponteiro para o valor contido por operand, caso contrário um ponteiro nulo.

### Exceções

1-3) Lança `bad_any_cast` se o `typeid` do `ValueType` solicitado não corresponder ao do conteúdo de operand.