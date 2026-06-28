# Modelos de variável para type traits (TS de Fundamentos da Biblioteca)

A Versão 1 das Extensões C++ para Fundamentos da Biblioteca fornece uma série de modelos de variável `constexpr` para classes de type traits, bem como outros modelos de classe semelhantes com membros `::value` públicos.

Salvo indicação em contrário, os seguintes modelos de variável são definidos no namespace `std::experimental`.

### Type traits

---

##### Categorias de tipo primárias

Modelo de variável | Valor
Definido no header `[<experimental/type_traits>](<https://en.cppreference.com/mwiki/index.php?title=cpp/header/experimental/type_traits&action=edit&redlink=1> "cpp/header/experimental/type traits \(page does not exist\)")`

```cpp
template<class T> constexpr bool is_void_v =
template<class T> constexpr bool is_null_pointer_v =
template<class T> constexpr bool is_integral_v =
template<class T> constexpr bool is_floating_point_v =
template<class T> constexpr bool is_array_v =
template<class T> constexpr bool is_pointer_v =
template<class T> constexpr bool is_lvalue_reference_v =
template<class T> constexpr bool is_rvalue_reference_v =
template<class T> constexpr bool is_member_object_pointer_v =
template<class T> constexpr bool is_member_function_pointer_v =
template<class T> constexpr bool is_enum_v =
template<class T> constexpr bool is_union_v =
template<class T> constexpr bool is_class_v =
template<class T> constexpr bool is_function_v =
```

##### Categorias de tipo compostas

Modelo de variável | Valor
Definido no header `[<experimental/type_traits>](<https://en.cppreference.com/mwiki/index.php?title=cpp/header/experimental/type_traits&action=edit&redlink=1> "cpp/header/experimental/type traits \(page does not exist\)")`

```cpp
template<class T> constexpr bool is_reference_v =
template<class T> constexpr bool is_arithmetic_v =
template<class T> constexpr bool is_fundamental_v =
template<class T> constexpr bool is_object_v =
template<class T> constexpr bool is_scalar_v =
template<class T> constexpr bool is_compound_v =
template<class T> constexpr bool is_member_pointer_v =
```

##### Propriedades de tipo

Modelo de variável | Valor
Definido no header `[<experimental/type_traits>](<https://en.cppreference.com/mwiki/index.php?title=cpp/header/experimental/type_traits&action=edit&redlink=1> "cpp/header/experimental/type traits \(page does not exist\)")`

```cpp
template<class T> constexpr bool is_const_v =
template<class T> constexpr bool is_volatile_v =
template<class T> constexpr bool is_trivial_v =
template<class T> constexpr bool is_trivially_copyable_v =
template<class T> constexpr bool is_standard_layout_v =
template<class T> constexpr bool is_pod_v =
template<class T> constexpr bool is_literal_type_v =
template<class T> constexpr bool is_empty_v =
template<class T> constexpr bool is_polymorphic_v =
template<class T> constexpr bool is_abstract_v =
template<class T> constexpr bool is_final_v =
template<class T> constexpr bool is_signed_v =
template<class T> constexpr bool is_unsigned_v =
```

##### Operações suportadas

---

Modelo de variável | Valor
Definido no header `[<experimental/type_traits>](<https://en.cppreference.com/mwiki/index.php?title=cpp/header/experimental/type_traits&action=edit&redlink=1> "cpp/header/experimental/type traits \(page does not exist\)")`

```cpp
template<class T, class... Args> constexpr bool is_constructible_v =
template<class T, class... Args> constexpr bool is_trivially_constructible_v =
template<class T, class... Args> constexpr bool is_nothrow_constructible_v =
template<class T> constexpr bool is_default_constructible_v =
template<class T> constexpr bool is_trivially_default_constructible_v =
template<class T> constexpr bool is_nothrow_default_constructible_v =
template<class T> constexpr bool is_copy_constructible_v =
template<class T> constexpr bool is_trivially_copy_constructible_v =
template<class T> constexpr bool is_nothrow_copy_constructible_v =
template<class T> constexpr bool is_move_constructible_v =
template<class T> constexpr bool is_trivially_move_constructible_v =
template<class T> constexpr bool is_nothrow_move_constructible_v =
template<class T, class U> constexpr bool is_assignable_v =
template<class T, class U> constexpr bool is_trivially_assignable_v =
template<class T, class U> constexpr bool is_nothrow_assignable_v =
template<class T> constexpr bool is_copy_assignable_v =
template<class T> constexpr bool is_trivially_copy_assignable_v =
template<class T> constexpr bool is_nothrow_copy_assignable_v =
template<class T> constexpr bool is_move_assignable_v =
template<class T> constexpr bool is_trivially_move_assignable_v =
template<class T> constexpr bool is_nothrow_move_assignable_v =
template<class T> constexpr bool is_destructible_v =
template<class T> constexpr bool is_trivially_destructible_v =
template<class T> constexpr bool is_nothrow_destructible_v =
template<class T> constexpr bool has_virtual_destructor_v =
```

##### Consultas de propriedade

---

Modelo de variável | Valor
Definido no header `[<experimental/type_traits>](<https://en.cppreference.com/mwiki/index.php?title=cpp/header/experimental/type_traits&action=edit&redlink=1> "cpp/header/experimental/type traits \(page does not exist\)")`

```cpp
template<class T> constexpr std::size_t alignment_of_v =
template<class T> constexpr std::size_t rank_v =
template<class T, unsigned I = 0> constexpr std::size_t extent_v =
```

##### Relações de tipo

Modelo de variável | Valor
Definido no header `[<experimental/type_traits>](<https://en.cppreference.com/mwiki/index.php?title=cpp/header/experimental/type_traits&action=edit&redlink=1> "cpp/header/experimental/type traits \(page does not exist\)")`

```cpp
template<class T, class U> constexpr bool is_same_v =
template<class Base, class Derived> constexpr bool is_base_of_v =
template<class From, class To> constexpr bool is_convertible_v =
```

### Outros modelos de variável

##### Comparação de `std::ratio`

Modelo de variável | Valor
Definido no header `[<experimental/ratio>](<https://en.cppreference.com/mwiki/index.php?title=cpp/header/experimental/ratio&action=edit&redlink=1> "cpp/header/experimental/ratio \(page does not exist\)")`

```cpp
template<class R1, class R2> constexpr bool ratio_equal_v =
template<class R1, class R2> constexpr bool ratio_not_equal_v =
template<class R1, class R2> constexpr bool ratio_less_v =
template<class R1, class R2> constexpr bool ratio_less_equal_v =
template<class R1, class R2> constexpr bool ratio_greater_v =
template<class R1, class R2> constexpr bool ratio_greater_equal_v =
```

##### Diversos

Modelo de variável | Valor
Definido no header `[<experimental/tuple>](<https://en.cppreference.com/mwiki/index.php?title=cpp/header/experimental/tuple&action=edit&redlink=1> "cpp/header/experimental/tuple \(page does not exist\)")`

```cpp
template<class T> constexpr std::size_t tuple_size_v =
Definido no header `<experimental/chrono>")`
template<class Rep> constexpr bool treat_as_floating_point_v =
Definido no header `<experimental/system_error>")`
template<class T> constexpr bool is_error_code_enum_v =
template<class T> constexpr bool is_error_condition_enum_v =
Definido no header `<experimental/functional>`
template<class T> constexpr bool is_bind_expression_v =
template<class T> constexpr int is_placeholder_v =
Definido no header `<experimental/memory>")`
template<class T, class Alloc> constexpr bool uses_allocator_v =
```

### Notas

[1]: Definido no namespace `std::chrono::experimental`.