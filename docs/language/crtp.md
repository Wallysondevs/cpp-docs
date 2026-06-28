# Padrão de Template Recorrente Curiosamente

O [Padrão de Template Recorrente Curiosamente](<https://en.wikipedia.org/wiki/Curiously_Recurring_Template_Pattern> "enwiki:Curiously Recurring Template Pattern") é um idioma no qual uma classe `X` deriva de um class template `Y`, recebendo um template parameter `Z`, onde `Y` é instanciado com Z = X. Por exemplo,
```cpp
    template<class Z>
    class Y {};
    
    class X : public Y<X> {};
```
  
### Exemplo

CRTP pode ser usado para implementar "polimorfismo em tempo de compilação", quando uma classe base expõe uma interface, e as classes derivadas implementam tal interface.

Execute este código
```cpp
    #include <cstdio>
    
    #ifndef __cpp_explicit_this_parameter // Sintaxe tradicional
    
    template <class Derived>
    struct Base
    {
        void name() { static_cast<Derived*>(this)->impl(); }
    protected:
        Base() = default; // proíbe a criação de objetos Base, o que é UB
    };
    struct D1 : public Base<D1> { void impl() { std::puts("D1::impl()"); } };
    struct D2 : public Base<D2> { void impl() { std::puts("D2::impl()"); } };
    
    #else // Sintaxe deduzindo-this do C++23
    
    struct Base { void name(this auto&& self) { self.impl(); } };
    struct D1 : public Base { void impl() { std::puts("D1::impl()"); } };
    struct D2 : public Base { void impl() { std::puts("D2::impl()"); } };
    
    #endif
    
    int main()
    {
        D1 d1; d1.name();
        D2 d2; d2.name();
    }
```

Saída: 
```
    D1::impl()
    D2::impl()
```

### Veja também

[Funções membro de objeto explícito (deduzindo `this`)](<#/doc/language/member_functions>) (C++23)  
---  
[ enable_shared_from_this](<#/doc/memory/enable_shared_from_this>)(desde C++11) | permite que um objeto crie um `shared_ptr` referindo-se a si mesmo   
(class template)  
[ ranges::view_interface](<#/doc/ranges/view_interface>)(desde C++20) | class template auxiliar para definir um [`view`](<#/doc/ranges/view>), usando o **padrão de template recorrente curiosamente**   
(class template)  
  
### Links externos

1\.  | [Replace CRTP with concepts?](<https://www.sandordargo.com/blog/2024/12/04/crtp-vs-concepts>) — Blog de Sandor Drago   
---|---
2\.  | [The Curiously Recurring Template Pattern (CRTP)](<https://www.sandordargo.com/blog/2019/03/13/the-curiously-recurring-templatep-pattern-CRTP>) — Blog de Sandor Drago   
3\.  | [The Curiously Recurring Template Pattern (CRTP) - 1](<https://www.fluentcpp.com/2017/05/12/curiously-recurring-template-pattern/>) — Fluent{C++}  
4\.  | [What the CRTP can bring to your code - 2](<https://www.fluentcpp.com/2017/05/16/what-the-crtp-brings-to-code/>) — Fluent{C++}  
5\.  | [An implementation helper for the CRTP - 3](<https://www.fluentcpp.com/2017/05/19/crtp-helper/>) — Fluent{C++}  
6\.  | [What is the Curiously Recurring Template Pattern (CRTP)](<https://stackoverflow.com/questions/4173254/what-is-the-curiously-recurring-template-pattern-crtp>) — SO 