# operator==,!=(std::istreambuf_iterator&lt;CharT,Traits&gt;)

Definido no cabeçalho `[<iterator>](<#/doc/header/iterator>)`

```c
template< class CharT, class Traits >
bool operator==( const std::istreambuf_iterator<CharT,Traits>& lhs,
const std::istreambuf_iterator<CharT,Traits>& rhs );
template< class CharT, class Traits >
bool operator!=( const std::istreambuf_ambuf_iterator<CharT,Traits>& lhs,
const std::istreambuf_iterator<CharT,Traits>& rhs );
friend bool operator==( const istreambuf_iterator& lhs,
std::default_sentinel_t );
```

Verifica se tanto `lhs` quanto `rhs` são válidos, ou se ambos são inválidos, independentemente dos objetos de buffer de stream que eles utilizam.

1) Equivalente a `lhs.equal(rhs)`.

2) Equivalente a `!lhs.equal(rhs)`.

3) Verifica se `lhs` é inválido. Equivalente a `lhs.equal(istreambuf_iterator{})`.
Esta função não é visível para [lookup não qualificado](<#/doc/language/unqualified_lookup>) ou [lookup qualificado](<#/doc/language/qualified_lookup>) comum, e só pode ser encontrada por [argument-dependent lookup](<#/doc/language/adl>) quando `std::istreambuf_iterator<CharT,Traits>` é uma classe associada dos argumentos.

```cpp
O operador `!=` é sintetizado a partir de `operator==`.  // (desde C++20)
```

### Parâmetros

- **lhs, rhs** — iteradores de buffer de stream para comparar

### Valor de retorno

1) O resultado de `lhs.equal(rhs)`.

2) O resultado de `!lhs.equal(rhs)`.

3) O resultado de `lhs.equal(istreambuf_iterator{})`.

### Exceções

Pode lançar exceções definidas pela implementação.