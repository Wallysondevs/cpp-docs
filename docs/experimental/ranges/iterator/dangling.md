Definido no cabeçalho `[<experimental/ranges/iterator>](<#/doc/header/experimental/ranges/iterator>)`

```c
template< CopyConstructible T >
class dangling {
public:
dangling() requires DefaultConstructible<T>();
dangling(T t);
T get_unsafe() const;
};
template< Range R >
using safe_iterator_t = std::conditional_t<std::is_lvalue_reference<R>::value,
ranges::iterator_t<R>,
ranges::dangling<ranges::iterator_t<R>>;
```

O template de classe `dangling` é um wrapper simples em torno de um objeto para indicar que o objeto encapsulado pode estar _dangling_, ou seja, ele se refere a outro objeto cuja vida útil pode ter terminado.

O template de alias `safe_iterator_t` retorna o tipo de iterator de `R`, encapsulado em `dangling` se o range era um rvalue range (conforme indicado por `R` não ser um tipo de referência lvalue).

Eles são usados por algoritmos de range que aceitam rvalue ranges e retornam iterators para eles.

### Funções membro

## std::experimental::ranges::dangling::dangling

```cpp
dangling() requires DefaultConstructible<T>();  // (1)
dangling(T t);  // (2)
```

1) Construtor padrão. Inicializa por valor o objeto encapsulado.

2) Inicializa o objeto encapsulado com `t`. Note que este construtor define uma conversão implícita de `T` para `dangling<T>`.

## std::experimental::ranges::dangling::get_unsafe

T get_unsafe() const;

Retorna uma cópia do objeto encapsulado.