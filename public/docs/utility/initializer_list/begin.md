# std::initializer_list&lt;T&gt;::begin

```cpp
const T* begin() const noexcept;  // (desde C++11)
(constexpr desde C++14)
```

  
Obtém um ponteiro para o primeiro elemento na initializer list. 

Se a initializer list estiver vazia, os valores de `begin()` e [end()](<#/doc/utility/initializer_list/end>) são não especificados, mas serão idênticos. 

### Parâmetros

(nenhum) 

### Valor de retorno

Um ponteiro para o primeiro elemento na initializer list 

### Complexidade

Constante 

### Exemplo

Execute este código
```
    #include <initializer_list>
     
    int main()
    {
        static constexpr auto il = {42, 24};
        static_assert(*il.begin() == 0x2A);
        static_assert(il.begin()[1] == 030);
    }
```

### Veja também

[ end](<#/doc/utility/initializer_list/end>) | retorna um ponteiro para um elemento após o último   
(função membro pública)  