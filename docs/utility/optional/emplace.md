# std::optional&lt;T&gt;::emplace

```cpp
template< class... Args >
T& emplace( Args&&... args );  // (1) (desde C++17)
(constexpr desde C++20)
template< class U, class... Args >
T& emplace( std::initializer_list<U> ilist, Args&&... args );  // (2) (desde C++17)
(constexpr desde C++20)
```

  
Constrói o valor contido no local (in-place). Se *this já contiver um valor antes da chamada, o valor contido é destruído chamando seu destrutor.

1) Inicializa o valor contido por [inicialização direta](<#/doc/language/direct_initialization>) (mas não inicialização direta por lista) com [std::forward](<#/doc/utility/forward>)&lt;Args&gt;(args)... como parâmetros.

2) Inicializa o valor contido chamando seu construtor com ilist, [std::forward](<#/doc/utility/forward>)&lt;Args&gt;(args)... como parâmetros. Esta sobrecarga participa da resolução de sobrecarga apenas se [std::is_constructible](<#/doc/types/is_constructible>)<T, [std::initializer_list](<#/doc/utility/initializer_list>)&lt;U&gt;&, Args&&...>::value for true.

### Parâmetros

args...  |  \-  |  os argumentos a serem passados para o construtor   
---|---|---
ilist  |  \-  |  a initializer list a ser passada para o construtor   
Requisitos de tipo   
-`T` deve ser construtível a partir de `Args...` para a sobrecarga (1)  
-`T` deve ser construtível a partir de [std::initializer_list](<#/doc/utility/initializer_list>) e `Args...` para a sobrecarga (2)  
  
### Valor de retorno

Uma referência para o novo valor contido.

### Exceções

Qualquer exceção lançada pelo construtor selecionado de `T`. Se uma exceção for lançada, *this não conterá um valor após esta chamada (o valor previamente contido, se houver, terá sido destruído).

```cpp
Macro de teste de recurso  | Valor | Std | Recurso
`__cpp_lib_optional` | `202106L`  // (C++20)
(DR20) | Totalmente constexpr (1,2)
```
  
### Exemplo

Execute este código
```cpp
    #include <iostream>
    #include <optional>
     
    struct A
    {
        std::string s;
     
        A(std::string str) : s(std::move(str)), id{n++} { note("+ constructed"); }
        ~A() { note("~ destructed"); }
        A(const A& o) : s(o.s), id{n++} { note("+ copy constructed"); }
        A(A&& o) : s(std::move(o.s)), id{n++} { note("+ move constructed"); }
     
        A& operator=(const A& other)
        {
            s = other.s;
            note("= copy assigned");
            return *this;
        }
     
        A& operator=(A&& other)
        {
            s = std::move(other.s);
            note("= move assigned");
            return *this;
        }
     
        inline static int n{};
        int id{};
        void note(auto s) { std::cout << "  " << s << " #" << id << '\n'; }
    };
     
    int main()
    {
        std::optional<A> opt;
     
        std::cout << "Assign:\n";
        opt = A("Lorem ipsum dolor sit amet, consectetur adipiscing elit nec.");
     
        std::cout << "Emplace:\n";
        // As opt contains a value it will also destroy that value
        opt.emplace("Lorem ipsum dolor sit amet, consectetur efficitur.");
     
        std::cout << "End example\n";
    }
```

Output: 
```
    Assign:
      + constructed #0
      + move constructed #1
      ~ destructed #0
    Emplace:
      ~ destructed #1
      + constructed #2
    End example
      ~ destructed #2
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR  | Aplicado a  | Comportamento conforme publicado  | Comportamento correto   
---|---|---|---
[P2231R1](<https://wg21.link/P2231R1>) | C++20  | `emplace` não era constexpr enquanto as operações necessárias podem ser constexpr em C++20  | tornado constexpr  
  
### Veja também

[ operator=](<#/>) |  atribui conteúdo   
(função membro pública)  