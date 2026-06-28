# Cabeçalho da biblioteca padrão &lt;concepts&gt; (C++20)

Este cabeçalho faz parte da biblioteca [concepts](<#/doc/concepts>).

### Conceitos

---

##### Conceitos da linguagem principal

[ same_as](<#/doc/concepts/same_as>)(C++20) | especifica que um tipo é o mesmo que outro tipo
(concept)
[ derived_from](<#/doc/concepts/derived_from>)(C++20) | especifica que um tipo é derivado de outro tipo
(concept)
[ convertible_to](<#/doc/concepts/convertible_to>)(C++20) | especifica que um tipo é implicitamente conversível para outro tipo
(concept)
[ common_reference_with](<#/doc/concepts/common_reference_with>)(C++20) | especifica que dois tipos compartilham um tipo de referência comum
(concept)
[ common_with](<#/doc/concepts/common_with>)(C++20) | especifica que dois tipos compartilham um tipo comum
(concept)
[ integral](<#/doc/concepts/integral>)(C++20) | especifica que um tipo é um tipo integral
(concept)
[ signed_integral](<#/doc/concepts/signed_integral>)(C++20) | especifica que um tipo é um tipo integral com sinal
(concept)
[ unsigned_integral](<#/doc/concepts/unsigned_integral>)(C++20) | especifica que um tipo é um tipo integral sem sinal
(concept)
[ floating_point](<#/doc/concepts/floating_point>)(C++20) | especifica que um tipo é um tipo de ponto flutuante
(concept)
[ assignable_from](<#/doc/concepts/assignable_from>)(C++20) | especifica que um tipo é atribuível a partir de outro tipo
(concept)
[ swappableswappable_with](<#/doc/concepts/swappable>)(C++20) | especifica que um tipo pode ser trocado ou que dois tipos podem ser trocados entre si
(concept)
[ destructible](<#/doc/concepts/destructible>)(C++20) | especifica que um objeto do tipo pode ser destruído
(concept)
[ constructible_from](<#/doc/concepts/constructible_from>)(C++20) | especifica que uma variável do tipo pode ser construída a partir de ou vinculada a um conjunto de tipos de argumento
(concept)
[ default_initializable](<#/doc/concepts/default_initializable>)(C++20) | especifica que um objeto de um tipo pode ser construído por padrão
(concept)
[ move_constructible](<#/doc/concepts/move_constructible>)(C++20) | especifica que um objeto de um tipo pode ser construído por movimento
(concept)
[ copy_constructible](<#/doc/concepts/copy_constructible>)(C++20) | especifica que um objeto de um tipo pode ser construído por cópia e construído por movimento
(concept)

##### Conceitos de comparação

[ equality_comparableequality_comparable_with](<#/doc/concepts/equality_comparable>)(C++20) | especifica que o operador == é uma relação de equivalência
(concept)
[ totally_orderedtotally_ordered_with](<#/doc/concepts/totally_ordered>)(C++20) | especifica que os operadores de comparação no tipo produzem uma ordem total
(concept)

##### Conceitos de objeto

[ movable](<#/doc/concepts/movable>)(C++20) | especifica que um objeto de um tipo pode ser movido e trocado
(concept)
[ copyable](<#/doc/concepts/copyable>)(C++20) | especifica que um objeto de um tipo pode ser copiado, movido e trocado
(concept)
[ semiregular](<#/doc/concepts/semiregular>)(C++20) | especifica que um objeto de um tipo pode ser copiado, movido, trocado e construído por padrão
(concept)
[ regular](<#/doc/concepts/regular>)(C++20) | especifica que um tipo é regular, ou seja, é tanto [semiregular](<#/doc/concepts/semiregular>) quanto [equality_comparable](<#/doc/concepts/equality_comparable>)
(concept)

##### Conceitos de invocáveis

[ invocableregular_invocable](<#/doc/concepts/invocable>)(C++20) | especifica que um tipo invocável pode ser invocado com um dado conjunto de tipos de argumento
(concept)
[ predicate](<#/doc/concepts/predicate>)(C++20) | especifica que um tipo invocável é um predicado booleano
(concept)
[ relation](<#/doc/concepts/relation>)(C++20) | especifica que um tipo invocável é uma relação binária
(concept)
[ equivalence_relation](<#/doc/concepts/equivalence_relation>)(C++20) | especifica que uma [relação](<#/doc/concepts/relation>) impõe uma relação de equivalência
(concept)
[ strict_weak_order](<#/doc/concepts/strict_weak_order>)(C++20) | especifica que uma [relação](<#/doc/concepts/relation>) impõe uma ordenação fraca estrita
(concept)

### Objetos de ponto de customização

[ ranges::swap](<#/doc/utility/ranges/swap>)(C++20) | troca os valores de dois objetos
(objeto de ponto de customização)

### Sinopse
```cpp
    // all freestanding
    namespace std {
      // language-related concepts
      // concept same_as
      template<class T, class U>
      concept same_as = /* see description */;
    
      // concept derived_from
      template<class Derived, class Base>
      concept derived_from = /* see description */;
    
      // concept convertible_to
      template<class From, class To>
      concept convertible_to = /* see description */;
    
      // concept common_reference_with
      template<class T, class U>
      concept common_reference_with = /* see description */;
    
      // concept common_with
      template<class T, class U>
      concept common_with = /* see description */;
    
      // arithmetic concepts
      template<class T>
      concept integral = /* see description */;
      template<class T>
      concept signed_integral = /* see description */;
      template<class T>
      concept unsigned_integral = /* see description */;
      template<class T>
      concept floating_point = /* see description */;
    
      // concept assignable_from
      template<class LHS, class RHS>
      concept assignable_from = /* see description */;
    
      // concept swappable
      namespace ranges {
        inline namespace /* unspecified */ {
          inline constexpr /* unspecified */ swap = /* unspecified */;
        }
      }
      template<class T>
      concept swappable = /* see description */;
      template<class T, class U>
      concept swappable_with = /* see description */;
    
      // concept destructible
      template<class T>
      concept destructible = /* see description */;
    
      // concept constructible_from
      template<class T, class... Args>
      concept constructible_from = /* see description */;
    
      // concept default_initializable
      template<class T>
      concept default_initializable = /* see description */;
    
      // concept move_constructible
      template<class T>
      concept move_constructible = /* see description */;
    
      // concept copy_constructible
      template<class T>
      concept copy_constructible = /* see description */;
    
      // comparison concepts
      // concept equality_comparable
      template<class T>
      concept equality_comparable = /* see description */;
      template<class T, class U>
      concept equality_comparable_with = /* see description */;
    
      // concept totally_ordered
      template<class T>
      concept totally_ordered = /* see description */;
      template<class T, class U>
      concept totally_ordered_with = /* see description */;
    
      // object concepts
      template<class T>
      concept movable = /* see description */;
      template<class T>
      concept copyable = /* see description */;
      template<class T>
      concept semiregular = /* see description */;
      template<class T>
      concept regular = /* see description */;
    
      // callable concepts
      // concept invocable
      template<class F, class... Args>
      concept invocable = /* see description */;
    
      // concept regular_invocable
      template<class F, class... Args>
      concept regular_invocable = invocable<F, Args...>;
    
      // concept predicate
      template<class F, class... Args>
      concept predicate =
        regular_invocable<F, Args...> && boolean-testable<invoke_result_t<F, Args...>>;
    
      // concept relation
      template<class R, class T, class U>
      concept relation =
        predicate<R, T, T> && predicate<R, U, U> && predicate<R, T, U> && predicate<R, U, T>;
    
      // concept equivalence_relation
      template<class R, class T, class U>
      concept equivalence_relation = relation<R, T, U>;
    
      // concept strict_weak_order
      template<class R, class T, class U>
      concept strict_weak_order = relation<R, T, U>;
    }
```

#### Conceito auxiliar [`_boolean-testable_`](<#/doc/concepts/boolean-testable>)
```cpp
    template<class T>
    concept /*boolean-testable-impl*/ = convertible_to<T, bool>; // exposition only;
    
    template<class T>
    concept boolean-testable = // exposition only
      /*boolean-testable-impl*/<T> && requires(T&& t) {
        {
          !std::forward<T>(t)
        } -> /*boolean-testable-impl*/;
      };
```

#### Conceito [`same_as`](<#/doc/concepts/same_as>)
```cpp
    template<class T, class U>
    concept /*same-as-impl*/ = is_same_v<T, U>; // exposition only
    
    template<class T, class U>
    concept same_as = /*same-as-impl*/<T, U> && /*same-as-impl*/<U, T>;
```

#### Conceito [`derived_from`](<#/doc/concepts/derived_from>)
```cpp
    template<class Derived, class Base>
    concept derived_from = is_base_of_v<Base, Derived> &&
                           is_convertible_v<const volatile Derived*, const volatile Base*>;
```

#### Conceito [`convertible_to`](<#/doc/concepts/convertible_to>)
```cpp
    template<class From, class To>
    concept convertible_to =
      is_convertible_v<From, To> && requires { static_cast<To>(declval<From>()); };
```

#### Conceito [`common_reference_with`](<#/doc/concepts/common_reference_with>)
```cpp
    template<class T, class U>
    concept common_reference_with =
      same_as<common_reference_t<T, U>, common_reference_t<U, T>> &&
      convertible_to<T, common_reference_t<T, U>> &&
      convertible_to<U, common_reference_t<T, U>>;
```

#### Conceito [`common_with`](<#/doc/concepts/common_with>)
```cpp
    template<class T, class U>
    concept common_with =
      same_as<common_type_t<T, U>, common_type_t<U, T>> &&
      requires {
        static_cast<common_type_t<T, U>>(declval<T>());
        static_cast<common_type_t<T, U>>(declval<U>());
      } &&
      common_reference_with<add_lvalue_reference_t<const T>,
                            add_lvalue_reference_t<const U>> &&
      common_reference_with<
        add_lvalue_reference_t<common_type_t<T, U>>,
        common_reference_t<add_lvalue_reference_t<const T>, add_lvalue_reference_t<const U>>>;
```

#### Conceito [`integral`](<#/doc/concepts/integral>)
```cpp
    template<class T>
    concept integral = is_integral_v<T>;
```

#### Conceito [`signed_integral`](<#/doc/concepts/signed_integral>)
```cpp
    template<class T>
    concept signed_integral = integral<T> && is_signed_v<T>;
```

#### Conceito [`unsigned_integral`](<#/doc/concepts/unsigned_integral>)
```cpp
    template<class T>
    concept unsigned_integral = integral<T> && !signed_integral<T>;
```

#### Conceito [`floating_point`](<#/doc/concepts/floating_point>)
```cpp
    template<class T>
    concept floating_point = is_floating_point_v<T>;
```

#### Conceito [`assignable_from`](<#/doc/concepts/assignable_from>)
```cpp
    template<class LHS, class RHS>
    concept assignable_from =
      is_lvalue_reference_v<LHS> &&
      common_reference_with<const remove_reference_t<LHS>&, const remove_reference_t<RHS>&> &&
      requires(LHS lhs, RHS&& rhs) {
        {
          lhs = std::forward<RHS>(rhs)
        } -> same_as<LHS>;
      };
```

#### Conceito [`swappable`](<#/doc/concepts/swappable>)
```cpp
    template<class T>
    concept swappable = requires(T& a, T& b) { ranges::swap(a, b); };
```

#### Conceito [`swappable_with`](<#/doc/concepts/swappable>)
```cpp
    template<class T, class U>
    concept swappable_with = common_reference_with<T, U> && requires(T&& t, U&& u) {
      ranges::swap(std::forward<T>(t), std::forward<T>(t));
      ranges::swap(std::forward<U>(u), std::forward<U>(u));
      ranges::swap(std::forward<T>(t), std::forward<U>(u));
      ranges::swap(std::forward<U>(u), std::forward<T>(t));
    };
```

#### Conceito [`destructible`](<#/doc/concepts/destructible>)
```cpp
    template<class T>
    concept destructible = is_nothrow_destructible_v<T>;
```

#### Conceito [`constructible_from`](<#/doc/concepts/constructible_from>)
```cpp
    template<class T, class... Args>
    concept constructible_from = destructible<T> && is_constructible_v<T, Args...>;
```

#### Conceito [`default_initializable`](<#/doc/concepts/default_initializable>)
```cpp
    template<class T>
    constexpr bool /*is-default-initializable*/ = /* see description */; // exposition only
    
    template<class T>
    concept default_initializable =
      constructible_from<T> && requires { T{}; } && /*is-default-initializable*/<T>;
```

#### Conceito [`move_constructible`](<#/doc/concepts/move_constructible>)
```cpp
    template<class T>
    concept move_constructible = constructible_from<T, T> && convertible_to<T, T>;
```

#### Conceito [`copy_constructible`](<#/doc/concepts/copy_constructible>)
```cpp
    template<class T>
    concept copy_constructible =
      move_constructible<T> && constructible_from<T, T&> && convertible_to<T&, T> &&
      constructible_from<T, const T&> && convertible_to<const T&, T> &&
      constructible_from<T, const T> && convertible_to<const T, T>;
```

#### Conceito [`equality_comparable`](<#/doc/concepts/equality_comparable>)
```cpp
    template<class T, class U>
    concept /*weakly-equality-comparable-with*/ = // exposition only
      requires(const remove_reference_t<T>& t, const remove_reference_t<U>& u) {
        { t == u } -> boolean-testable;
        { t != u } -> boolean-testable;
        { u == t } -> boolean-testable;
        { u != t } -> boolean-testable;
      };
    
    template<class T>
    concept equality_comparable = /*weakly-equality-comparable-with*/<T, T>;
```

#### Conceito [`equality_comparable_with`](<#/doc/concepts/equality_comparable>)
```cpp
    template<class T, class U, class C = common_reference_t<const T&, const U&>>
    concept /*comparison-common-type-with-impl*/ = // exposition only
      same_as<common_reference_t<const T&, const U&>,
              common_reference_t<const U&, const T&>> &&
      requires {
        requires convertible_to<const T&, const C&> || convertible_to<T, const C&>;
        requires convertible_to<const U&, const C&> || convertible_to<U, const C&>;
      };
    
    template<class T, class U>
    concept /*comparison-common-type-with*/ = // exposition only
      /*comparison-common-type-with-impl*/<remove_cvref_t<T>, remove_cvref_t<U>>;
    
    template<class T, class U>
    concept equality_comparable_with =
      equality_comparable<T> && equality_comparable<U> &&
      /*comparison-common-type-with*/<T, U> &&
      equality_comparable<
        common_reference_t<const remove_reference_t<T>&, const remove_reference_t<U>&>> &&
      /*weakly-equality-comparable-with*/<T, U>;
```

#### Conceito auxiliar [`_partially-ordered-with_`](<#/doc/concepts/totally_ordered>)

Definido no cabeçalho [`<compare>`](<#/doc/header/compare>)
```cpp
    template<class T, class U>
    concept /*partially-ordered-with*/ = // exposition only
      requires(const remove_reference_t<T>& t, const remove_reference_t<U>& u) {
        { t <  u } -> boolean-testable;
        { t >  u } -> boolean-testable;
        { t <= u } -> boolean-testable;
        { t >= u } -> boolean-testable;
        { u <  t } -> boolean-testable;
        { u >  t } -> boolean-testable;
        { u <= t } -> boolean-testable;
        { u >= t } -> boolean-testable;
      };
```

#### Conceito [`totally_ordered`](<#/doc/concepts/totally_ordered>)
```cpp
    template<class T>
    concept totally_ordered = equality_comparable<T> && /*partially-ordered-with*/<T, T>;
```

#### Conceito [`totally_ordered_with`](<#/doc/concepts/totally_ordered>)
```cpp
    template<class T, class U>
    concept totally_ordered_with =
      totally_ordered<T> && totally_ordered<U> && equality_comparable_with<T, U> &&
      totally_ordered<
        common_reference_t<const remove_reference_t<T>&, const remove_reference_t<U>&>> &&
      /*partially-ordered-with*/<T, U>;
```

#### Conceito [`movable`](<#/doc/concepts/movable>)
```cpp
    template<class T>
    concept movable =
      is_object_v<T> && move_constructible<T> && assignable_from<T&, T> && swappable<T>;
```

#### Conceito [`copyable`](<#/doc/concepts/copyable>)
```cpp
    template<class T>
    concept copyable = copy_constructible<T> && movable<T> && assignable_from<T&, T&> &&
                       assignable_from<T&, const T&> && assignable_from<T&, const T>;
```

#### Conceito [`semiregular`](<#/doc/concepts/semiregular>)
```cpp
    template<class T>
    concept semiregular = copyable<T> && default_initializable<T>;
```

#### Conceito [`regular`](<#/doc/concepts/regular>)
```cpp
    template<class T>
    concept regular = semiregular<T> && equality_comparable<T>;
```

#### Conceito [`invocable`](<#/doc/concepts/invocable>)
```cpp
    template<class F, class... Args>
    concept invocable = requires(F&& f, Args&&... args) {
      invoke(std::forward<F>(f),
             std::forward<Args>(args)...); // not required to be equality-preserving
    };
```

#### Conceito [`regular_invocable`](<#/doc/concepts/invocable>)
```cpp
    template<class F, class... Args>
      concept regular_invocable = invocable<F, Args...>;
```

#### Conceito [`predicate`](<#/doc/concepts/predicate>)
```cpp
    template<class F, class... Args>
    concept predicate =
      regular_invocable<F, Args...> && boolean-testable<invoke_result_t<F, Args...>>;
```

#### Conceito [`relation`](<#/doc/concepts/relation>)
```cpp
    template<class R, class T, class U>
    concept relation =
      predicate<R, T, T> && predicate<R, U, U> && predicate<R, T, U> && predicate<R, U, T>;
```

#### Conceito [`equivalence_relation`](<#/doc/concepts/equivalence_relation>)
```cpp
    template<class R, class T, class U>
    concept equivalence_relation = relation<R, T, U>;
```

#### Conceito [`strict_weak_order`](<#/doc/concepts/strict_weak_order>)
```cpp
    template<class R, class T, class U>
    concept strict_weak_order = relation<R, T, U>;
```