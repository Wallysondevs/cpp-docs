# std::basic_string&lt;CharT,Traits,Allocator&gt;::shrink_to_fit

void shrink_to_fit(); |  | (constexpr desde C++20)

Solicita a remoção de capacidade não utilizada.

É uma solicitação não vinculativa para reduzir [capacity()](<#/doc/string/basic_string/capacity>) para [size()](<#/doc/string/basic_string/size>). Depende da implementação se a solicitação será atendida.

Se (e somente se) a realocação ocorrer, todos os ponteiros, referências e iteradores são invalidados.

### Complexidade

Linear no tamanho da string.

### Notas

No libstdc++, `shrink_to_fit()` [não está disponível](<https://gcc.gnu.org/onlinedocs/libstdc++/manual/strings.html#strings.string.shrink>) no modo C++98.

### Exemplo

Execute este código
```cpp
    #include <iostream>
    #include <string>
    
    int main()
    {
        std::string s;
        std::cout << "Size of std::string is " << sizeof s << " bytes\n"
            << "Default-constructed capacity is " << s.capacity() 
            << " and size is " << s.size() << '\n';
    
        for (int i = 0; i < 42; i++)
            s.append(" 42 ");
        std::cout << "Capacity after 42 appends is " << s.capacity() 
            << " and size is " << s.size() << '\n';
    
        s.clear();
        std::cout << "Capacity after clear() is " << s.capacity() 
            << " and size is " << s.size() << '\n';
    
        s.shrink_to_fit();
        std::cout << "Capacity after shrink_to_fit() is " << s.capacity() 
            << " and size is " << s.size() << '\n';
    }
```

Saída possível:
```
    GCC output:
    Size of std::string is 32 bytes
    Default-constructed capacity is 15 and size 0
    Capacity after 42 appends is 240 and size 168
    Capacity after clear() is 240 and size 0
    Capacity after shrink_to_fit() is 15 and size 0
    
    clang output (with -stdlib=libc++):
    Size of std::string is 24 bytes
    Default-constructed capacity is 22 and size is 0
    Capacity after 42 appends is 191 and size is 168
    Capacity after clear() is 191 and size is 0
    Capacity after shrink_to_fit() is 22 and size is 0
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR  | Aplicado a  | Comportamento conforme publicado  | Comportamento correto
---|---|---|---
[LWG 755](<https://cplusplus.github.io/LWG/issue755>) | C++98  | `std::string` não possuía operações explícitas de shrink-to-fit  | fornecido
[LWG 2223](<https://cplusplus.github.io/LWG/issue2223>) | C++98  | 1. referências, ponteiros e iteradores não eram invalidados
2. não havia requisito de complexidade  | 1. eles podem ser invalidados
2. exigido ser linear

### Veja também

[ sizelength](<#/doc/string/basic_string/size>) |  retorna o número de caracteres
(função membro pública)
[ capacity](<#/doc/string/basic_string/capacity>) |  retorna o número de caracteres que podem ser armazenados na memória alocada atualmente
(função membro pública)
[ resize](<#/doc/string/basic_string/resize>) |  altera o número de caracteres armazenados
(função membro pública)