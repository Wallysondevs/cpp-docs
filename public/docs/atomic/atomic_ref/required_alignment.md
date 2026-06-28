# std::atomic_ref&lt;T&gt;::required_alignment

```cpp
static constexpr std::size_t required_alignment = /*implementation-defined*/;  // (desde C++20)
```

  
O valor de `required_alignment` é o alinhamento requerido para um objeto a ser referenciado por uma referência atômica, que é no mínimo alignof(T).

### Notas

O hardware pode exigir que um objeto a ser referenciado por um `atomic_ref<T>` tenha um alinhamento mais rigoroso do que outros objetos `T`, e se as operações em um `atomic_ref` são lock-free pode depender do alinhamento do objeto referenciado.