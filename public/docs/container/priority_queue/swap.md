# std::priority_queue&lt;T,Container,Compare&gt;::swap

```cpp
void swap( priority_queue& other ) noexcept(/* see below */);  // (desde C++11)
```

Troca o conteúdo do adaptador de container com o de `other`. Efetivamente chama
```
    using std::swap;
    swap(c, other.c);
    swap(comp, other.comp);
```

### Parâmetros

other  |  \-  |  adaptador de container para trocar o conteúdo com   
  
### Valor de retorno

(nenhum)

### Exceções

```cpp
`noexcept` especificação: noexcept(noexcept(swap(c, other.c)) && noexcept(swap(comp, other.comp))) Na expressão acima, o identificador `swap` é procurado da mesma maneira que o usado pelo trait `std::is_nothrow_swappable` do C++17.  // (desde C++11)
(até C++17)
`noexcept` especificação: noexcept(std::is_nothrow_swappable_v<Container> &&
std::is_nothrow_swappable_v<Compare>)  // (desde C++17)
```
  
### Complexidade

Mesma do container subjacente (tipicamente constante).

### Observações

Algumas implementações (por exemplo, libc++) fornecem a função membro `swap` como uma extensão para modos anteriores ao C++11.

### Exemplo

Execute este código
```
    #include <iostream>
    #include <concepts>
    #include <functional>
    #include <queue>
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
                std::cout << name << " " << [std::size(this->c) << "]: ";
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
     
        std::priority_queue s1(std::less<>(), std::move(v1));
        std::priority_queue s2(std::less<>(), std::move(v2));
     
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

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR  | Aplicado a  | Comportamento publicado  | Comportamento correto   
---|---|---|---
[LWG 2456](<https://cplusplus.github.io/LWG/issue2456>) | C++11  | a especificação `noexcept` está malformada  | feito para funcionar   
  
### Veja também

[ std::swap(std::priority_queue)](<#/doc/container/priority_queue/swap2>)(C++11) |  especializa o algoritmo [std::swap](<#/doc/utility/swap>)   
(modelo de função)  