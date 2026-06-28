# std::experimental::ranges::tagged&lt;Base,Tags...&gt;::operator=

```cpp
tagged &operator=( tagged&& that ) = default;  // (1)
tagged &operator=( const tagged& that ) = default;  // (2)
template< class Other >
requires Assignable<Base&, Other>
constexpr tagged& operator=( ranges::tagged<Other, Tags...>&& that )
noexcept(std::is_nothrow_assignable<Base&, Other>::value);  // (3)
template< class Other >
requires Assignable<Base&, const Other&>
constexpr tagged& operator=( const ranges::tagged<Other, Tags...>& that );  // (4)
template< class U >
requires Assignable<Base&, U> && !Same<std::decay_t<U>, tagged>
constexpr tagged& operator=( U&& that ) noexcept(std::is_nothrow_assignable<Base&, U>::value);  // (5)
```

  
Atribui o conteúdo de `that` a `*this`.

1,2) `tagged` possui operadores de atribuição de cópia e de movimento padronizados que invocam o operador de atribuição correspondente de `Base`.

3) Atribuição de movimento de conversão de uma especialização `tagged` diferente com tags correspondentes. Equivalente a `static_cast<Base&>(*this) = static_cast<Other&&>(that);`.

4) Atribuição de cópia de conversão de uma especialização `tagged` diferente com tags correspondentes. Equivalente a `static_cast<Base&>(*this) = static_cast<const Other&>(that);`.

5) Atribui `that` ao subobjeto `Base`. Equivalente a `static_cast<Base&>(*this) = [std::forward](<#/doc/utility/forward>)<U>(that);`.

### Valor de retorno

`*this`.