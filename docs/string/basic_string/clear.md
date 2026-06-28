# std::basic_string&lt;CharT,Traits,Allocator&gt;::clear

void clear(); |  | (noexcept desde C++11)   
(constexpr desde C++20)  

  
Remove todos os caracteres da string como se executasse erase(begin(), end()).

Todos os ponteiros, referências e iteradores são invalidados.

### Parâmetros

(nenhum)

### Valor de retorno

(nenhum)

### Observações

Ao contrário de [std::vector::clear](<#/doc/container/vector/clear>), o padrão C++ não exige explicitamente que a [capacity](<#/doc/string/basic_string/capacity>) não seja alterada por esta função, mas as implementações existentes não alteram a capacity. Isso significa que elas não liberam a memória alocada (veja também [shrink_to_fit](<#/doc/string/basic_string/shrink_to_fit>)).

### Complexidade

Linear no tamanho da string, embora as implementações existentes operem em tempo constante.

### Exemplo

Execute este código
```
    #include <cassert>
    #include <iostream>
    #include <string>
     
    int main()
    {
        std::string s{"Exemplar"};
        std::string::size_type const capacity = s.capacity();
     
        s.clear();
        assert(s.empty());
        assert(s.size() == 0);
        std::cout << std::boolalpha << (s.capacity() == capacity) << '\n';
    }
```

Saída possível: 
```
    true
```

### Veja também

[ erase](<#/doc/string/basic_string/erase>) | remove caracteres   
(função membro pública)  