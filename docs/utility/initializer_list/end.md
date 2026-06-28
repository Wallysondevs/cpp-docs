# std::initializer_list&lt;T&gt;::end

```cpp
const T* end() const noexcept;  // (desde C++11)
(constexpr desde C++14)
```

  
Obtém um ponteiro para um elemento após o último na initializer list, ou seja, [`begin()`](<#/doc/utility/initializer_list/begin>)` `+ size(). 

Se a initializer list estiver vazia, os valores de [`begin()`](<#/doc/utility/initializer_list/begin>) e `end()` são não especificados, mas serão idênticos. 

### Parâmetros

(nenhum) 

### Valor de retorno

Um ponteiro para um elemento após o último na initializer list 

### Complexidade

Constante 

### Exemplo

Execute este código
```
    #include <initializer_list>
    #include <numeric>
     
    int main()
    {
        static constexpr auto l = {3, 13, 13};
        static_assert(std::accumulate(l.begin(), l.end(), 13) == 42);
    }
```

### Veja também

[ begin](<#/doc/utility/initializer_list/begin>) |  retorna um ponteiro para o primeiro elemento   
(função membro pública)  