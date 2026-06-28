# std::stack&lt;T,Container&gt;::swap

```cpp
void swap( stack& other ) noexcept(/* see below */);  // (desde C++11)
```

Troca o conteúdo do adaptador de container com o de `other`. Efetivamente chama 
```cpp
    using std::swap;
    swap(c, other.c);
```

### Parâmetros

other  |  \-  |  adaptador de container para trocar o conteúdo com   
  
### Valor de retorno

(nenhum) 

### Exceções

```cpp
`noexcept` especificação: noexcept(noexcept(swap(c, other.c))) Na expressão acima, o identificador `swap` é procurado da mesma maneira que o usado pelo trait std::is_nothrow_swappable do C++17.  // (desde C++11)
(até C++17)
`noexcept` especificação: noexcept(std::is_nothrow_swappable_v<Container>)  // (desde C++17)
```
  
### Complexidade

Mesma que a do container subjacente (tipicamente constante). 

### Notas

Algumas implementações (por exemplo, libc++) fornecem a função membro `swap` como uma extensão para modos anteriores ao C++11. 

### Exemplo

Execute este código
```cpp 
    #include <iostream>
    #include <concepts>
    #include <stack>
    #include <string>
    #include <string_view>
    #include <vector>
    
    template<typename Adaptor>
    requires (std::ranges::input_range<typename Adaptor::container_type>)
    void print(std::string_view name, const Adaptor& adaptor)
    {
        struct Printer : Adaptor // to use protected Adaptor::Container c;
        {
            void print(std::string_view name) const
            {
                std::cout << name << " [" << std::size(this->c) << "]: ";
                for (auto const& elem : this->c)
                    std::cout << elem << ' ';
                std::cout << '\n';
            }
        };
    
        static_cast<Printer const&>(adaptor).print(name);
    }
    
    int main()
    {
        std::vector<std::string> v1{"1","2","3","4"},
                                 v2{"Ɐ","B","Ɔ","D","Ǝ"};
    
        std::stack s1(std::move(v1));
        std::stack s2(std::move(v2));
    
        print("s1", s1);
        print("s2", s2);
    
        s1.swap(s2);
    
        print("s1", s1);
        print("s2", s2);
    }
```

Saída: 
```
    s1 [4]: 4 3 2 1
    s2 [5]: Ǝ D Ɔ B Ɐ
    s1 [5]: Ǝ D Ɔ B Ɐ
    s2 [4]: 4 3 2 1
```

### Relatórios de Defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente. 

DR  | Aplicado a  | Comportamento como publicado  | Comportamento correto   
---|---|---|---
[LWG 2456](<https://cplusplus.github.io/LWG/issue2456>) | C++11  | a especificação `noexcept` é malformada  | feito para funcionar   
  
### Veja também

[ std::swap(std::stack)](<#/doc/container/stack/swap2>)(C++11) |  especializa o algoritmo [std::swap](<#/doc/utility/swap>)   
(modelo de função)  