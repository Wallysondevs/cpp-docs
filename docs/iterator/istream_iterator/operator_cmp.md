# operator==,!=(std::istream_iterator&lt;T, CharT, Traits, Dist&gt;)

Definido no cabeçalho `[<iterator>](<#/doc/header/iterator>)`

```c
template< class T, class CharT, class Traits, class Dist >
bool operator==( const std::istream_iterator<T, CharT, Traits, Dist>& lhs,
const std::istream_iterator<T, CharT, Traits, Dist>& rhs );
template< class T, class CharT, class Traits, Dist >
bool operator!=( const std::istream_iterator<T, CharT, Traits, Dist>& lhs,
const std::istream_iterator<T, CharT, Traits, Dist>& rhs );
friend bool operator==( const istream_iterator& i, std::default_sentinel_t );
```

Verifica se ambos lhs e rhs são iguais. Dois iteradores de stream são iguais se ambos são iteradores de fim de stream ou se ambos se referem à mesma stream.

1) Verifica se lhs é _igual a_ rhs.

2) Verifica se lhs é _diferente de_ rhs.

3) Verifica se lhs é um iterador de fim de stream.
Esta função não é visível para pesquisa [não qualificada](<#/doc/language/unqualified_lookup>) ou [qualificada](<#/doc/language/qualified_lookup>) comum, e só pode ser encontrada por [pesquisa dependente de argumento](<#/doc/language/adl>) quando std::istream_iterator<T, CharT, Traits, Dist> é uma classe associada dos argumentos.

```cpp
O operador `!=` é sintetizado a partir de `operator==`.  // (desde C++20)
```

### Parâmetros

- **lhs, rhs** — iteradores de stream para comparar

### Valor de retorno

1) true se lhs é _igual a_ rhs, false caso contrário.

2) true se lhs é _diferente de_ rhs, false caso contrário.

3) true se lhs é um iterador de fim de stream, false caso contrário.

### Exceções

Pode lançar exceções definidas pela implementação.

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[LWG 261](<https://cplusplus.github.io/LWG/issue261>) | C++98 | a descrição de `operator!=` estava faltando | adicionada