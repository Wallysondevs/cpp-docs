# std::initializer_list&lt;T&gt;::size

```cpp
size_type size() const noexcept;  // (desde C++11)
(constexpr desde C++14)
```

Obtém o número de elementos na initializer list.

### Parâmetros

(nenhum)

### Valor de retorno

[std::distance](<#/doc/iterator/distance>)(begin(), end())

### Complexidade

Constante

### Exemplo

Execute este código
```
    #include <initializer_list>
     
    static_assert(std::initializer_list{1, 2, 3}.size() == 3);
     
    int main() {}
```