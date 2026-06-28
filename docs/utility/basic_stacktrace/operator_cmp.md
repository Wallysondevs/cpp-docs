# operator==, operator<=> (std::basic_stacktrace)

```cpp
template< class Allocator2 >
friend bool operator==( const basic_stacktrace& lhs,
const basic_stacktrace<Allocator2>& rhs ) noexcept;  // (1) (desde C++23)
template< class Allocator2 >
friend std::strong_ordering
operator<=>( const basic_stacktrace& lhs,
const basic_stacktrace<Allocator2>& rhs ) noexcept;  // (2) (desde C++23)
```

  
1) Verifica se o conteúdo de lhs e rhs é igual, ou seja, se eles têm o mesmo número de elementos e se cada elemento em lhs se compara como igual ao elemento em rhs na mesma posição.

Equivalente a return [std::equal](<#/doc/algorithm/equal>)(lhs.begin(), lhs.end(), rhs.begin(), rhs.end());.

2) Retorna a ordem relativa dos números de entradas de stacktrace em lhs e rhs se eles não forem iguais. Caso contrário (se os números de elementos de lhs e rhs forem iguais), retorna a ordem lexicográfica dos elementos de lhs e rhs.

Equivalente a  
if (auto cmp = lhs.size() <=> rhs.size(); cmp != 0)  

return cmp;  
else  
return [std::lexicographical_compare_three_way](<#/doc/algorithm/lexicographical_compare_three_way>)(lhs.begin(), lhs.end(),  

rhs.begin(), rhs.end());.

Esses function templates não são visíveis para [lookup não qualificado](<#/doc/language/unqualified_lookup>) ou [lookup qualificado](<#/doc/language/qualified_lookup>) comum, e só podem ser encontrados por [argument-dependent lookup](<#/doc/language/adl>) quando std::basic_stacktrace&lt;Allocator&gt; é uma classe associada dos argumentos. 

Os operadores `<`, `<=`, `>`, `>=`, e `!=` são [sintetizados](<#/doc/language/operators>) a partir de operator<=> e operator== respectivamente. 

### Parâmetros

lhs, rhs  |  \-  |  `basic_stacktrace`s cujo conteúdo comparar   
  
### Valor de retorno

1) true se o conteúdo de lhs e rhs for igual, false caso contrário.

2) lhs.size() <=> rhs.size() se o resultado não for std::strong_order::equal, a ordem lexicográfica dos elementos de lhs e rhs caso contrário.

### Complexidade

1,2) Constante se lhs e rhs tiverem tamanhos diferentes, linear no tamanho de lhs caso contrário.

### Exemplo

| Esta seção está incompleta  
Razão: nenhum exemplo   