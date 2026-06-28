# operator==, !=, &lt;, &lt;=, &gt;, &gt;=(std::experimental::optional)

Definido no cabeçalho `[<experimental/optional>](<#/doc/header/experimental/optional>)`

```c
Compara dois objetos `optional`
template< class T >
constexpr bool operator==( const optional<T>& lhs, const optional<T>& rhs );
template< class T >
constexpr bool operator!=( const optional<T>& lhs, const optional<T>& rhs );
template< class T >
constexpr bool operator<( const optional<T>& lhs, const optional<T>& rhs );
template< class T >
constexpr bool operator<=( const optional<T>& lhs, const optional<T>& rhs );
template< class T >
constexpr bool operator>( const optional<T>& lhs, const optional<T>& rhs );
template< class T >
constexpr bool operator>=( const optional<T>& lhs, const optional<T>& rhs );
Compara um objeto `optional` com um `nullopt`
template< class T >
constexpr bool operator==( const optional<T>& opt, std::nullopt_t ) noexcept;
template< class T >
constexpr bool operator==( std::nullopt_t, const optional<T>& opt ) noexcept;
template< class T >
constexpr bool operator!=( const optional<T>& opt, std::nullopt_t ) noexcept;
template< class T >
constexpr bool operator!=( std::nullopt_t, const optional<T>& opt ) noexcept;
template< class T >
constexpr bool operator<( const optional<T>& opt, std::nullopt_t ) noexcept;
template< class T >
constexpr bool operator<( std::nullopt_t, const optional<T>& opt ) noexcept;
template< class T >
constexpr bool operator<=( const optional<T>& opt, std::nullopt_t ) noexcept;
template< class T >
constexpr bool operator<=( std::nullopt_t, const optional<T>& opt ) noexcept;
template< class T >
constexpr bool operator>( const optional<T>& opt, std::nullopt_t ) noexcept;
template< class T >
constexpr bool operator>( std::nullopt_t, const optional<T>& opt ) noexcept;
template< class T >
constexpr bool operator>=( const optional<T>& opt, std::nullopt_t ) noexcept;
template< class T >
constexpr bool operator>=( std::nullopt_t, const optional<T>& opt ) noexcept;
Compara um objeto `optional` com um `T`
template< class T >
constexpr bool operator==( const optional<T>& opt, const T& value );
template< class T >
constexpr bool operator==( const T& value, const optional<T>& opt );
template< class T >
constexpr bool operator!=( const optional<T>& opt, const T& value );
template< class T >
constexpr bool operator!=( const T& value, const optional<T>& opt );
template< class T >
constexpr bool operator<( const optional<T>& opt, const T& value );
template< class T >
constexpr bool operator<( const T& value, const optional<T>& opt );
template< class T >
constexpr bool operator<=( const optional<T>& opt, const T& value );
template< class T >
constexpr bool operator<=( const T& value, const optional<T>& opt );
template< class T >
constexpr bool operator>( const optional<T>& opt, const T& value );
template< class T >
constexpr bool operator>( const T& value, const optional<T>& opt );
template< class T >
constexpr bool operator>=( const optional<T>& opt, const T& value );
template< class T >
constexpr bool operator>=( const T& value, const optional<T>& opt );
```

Realiza operações de comparação em objetos `optional`.

1-6) Compara dois objetos `optional`, lhs e rhs. Os valores contidos são comparados (usando operator== para (1,2) e operator< para (3-6)) apenas se ambos lhs e rhs contiverem valores. Caso contrário,

*   lhs é considerado _igual a_ rhs se, e somente se, ambos lhs e rhs não contiverem um valor.
*   lhs é considerado _menor que_ rhs se, e somente se, rhs contiver um valor e lhs não.

7-18) Compara opt com um nullopt. Equivalente a (1-6) ao comparar com um `optional` que não contém um valor.

19-30) Compara opt com um value. Os valores são comparados (usando operator== para (19-22) e operator< para (23-30)) apenas se opt contiver um valor. Caso contrário, opt é considerado _menor que_ value.

### Parâmetros

- **lhs, rhs, opt** — um objeto `optional` para comparar
- **value** — valor para comparar com o valor contido
Requisitos de tipo
-`T` deve satisfazer os requisitos de [EqualityComparable](<#/doc/named_req/EqualityComparable>) para usar as sobrecargas (1,2).

### Valor de retorno

1) Se bool(lhs) != bool(rhs), retorna false.

Caso contrário, se bool(lhs) == false (e, portanto, bool(rhs) == false também), retorna true.

Caso contrário, retorna *lhs == *rhs.

2) Retorna !(lhs == rhs).

3) Se bool(rhs) == false, retorna false.

Caso contrário, se bool(lhs) == false, retorna true.

Caso contrário, retorna *x < *y.

4) Retorna !(rhs < lhs).

5) Retorna rhs < lhs.

6) Retorna !(lhs < rhs).

7,8) Retorna !opt.

9,10) Retorna bool(opt).

11) Retorna false.

12) Retorna bool(opt).

13) Retorna !opt.

14) Retorna true.

15) Retorna bool(opt).

16) Retorna false.

17) Retorna true.

18) Retorna !opt.

19) Retorna bool(opt) ? *opt == value : false.

20) Retorna bool(opt) ? value == *opt : false.

21) Retorna bool(opt) ? !(*opt == value) : true.

22) Retorna bool(opt) ? !(value == *opt) : true.

23) Retorna bool(opt) ? *opt < value : true.

24) Retorna bool(opt) ? value < *opt : false.

25) Retorna !(opt > value).

26) Retorna !(value > opt).

27) Retorna bool(opt) ? value < *opt : false.

28) Retorna bool(opt) ? *opt < value : true.

29) Retorna !(opt < value).

30) Retorna !(value < opt).

### Exceções

1-6) (nenhuma)

19-30) (nenhuma)