# std::ranges::view_interface

Definido no cabeçalho `[<ranges>](<#/doc/header/ranges>)`

```c
template< class D >
requires std::is_class_v<D> && std::same_as<D, std::remove_cv_t<D>>
class view_interface;
```

`std::ranges::view_interface` é um template de classe auxiliar para definir uma interface de view.

`view_interface` é tipicamente usado com [CRTP](<#/doc/language/crtp>):
```cpp
    class my_view : public std::ranges::view_interface<my_view>
    {
    public:
        auto begin() const { /*...*/ }
        auto end() const { /*...*/ }
        // empty() é fornecido se begin() retorna um forward iterator
        // e end() retorna um sentinel para ele.
    };
```

### Funções membro

[ empty](<#/doc/ranges/view_interface/empty>) | retorna se a view derivada está vazia. Fornecido se satisfaz [`sized_range`](<#/doc/ranges/sized_range>) ou [`forward_range`](<#/doc/ranges/forward_range>).
(função membro pública)
[ cbegin](<#/doc/ranges/view_interface/cbegin>)(C++23) | retorna um iterator constante para o início do range.
(função membro pública)
[ cend](<#/doc/ranges/view_interface/cend>)(C++23) | retorna um sentinel para o iterator constante do range.
(função membro pública)
[ operator bool](<#/doc/ranges/view_interface/operator_bool>) | retorna se a view derivada não está vazia. Fornecido se [ranges::empty](<#/doc/ranges/empty>) é aplicável a ela.
(função membro pública)
[ data](<#/doc/ranges/view_interface/data>) | obtém o endereço dos dados da view derivada. Fornecido se seu tipo de iterator satisfaz [`contiguous_iterator`](<#/doc/iterator/contiguous_iterator>).
(função membro pública)
[ size](<#/doc/ranges/view_interface/size>) | retorna o número de elementos na view derivada. Fornecido se satisfaz [`forward_range`](<#/doc/ranges/forward_range>) e seu sentinel e tipo de iterator satisfazem [`sized_sentinel_for`](<#/doc/iterator/sized_sentinel_for>).
(função membro pública)
[ front](<#/doc/ranges/view_interface/front>) | retorna o primeiro elemento na view derivada. Fornecido se satisfaz [`forward_range`](<#/doc/ranges/forward_range>).
(função membro pública)
[ back](<#/doc/ranges/view_interface/back>) | retorna o último elemento na view derivada. Fornecido se satisfaz [`bidirectional_range`](<#/doc/ranges/bidirectional_range>) e [`common_range`](<#/doc/ranges/common_range>).
(função membro pública)
[ operator[]](<#/doc/ranges/view_interface/operator_at>) | retorna o `n`-ésimo elemento na view derivada. Fornecido se satisfaz [`random_access_range`](<#/doc/ranges/random_access_range>).
(função membro pública)

### Exemplo

Execute este código
```cpp
    #include <iostream>
    #include <ranges>
    #include <vector>
    
    template<class T, class A>
    class VectorView : public std::ranges::view_interface<VectorView<T, A>>
    {
    public:
        VectorView() = default;
    
        VectorView(const std::vector<T, A>& vec) :
            m_begin(vec.cbegin()), m_end(vec.cend())
        {}
    
        auto begin() const { return m_begin; }
    
        auto end() const { return m_end; }
    
    private:
        typename std::vector<T, A>::const_iterator m_begin{}, m_end{};
    };
    
    int main()
    {
        std::vector<int> v = {1, 4, 9, 16};
    
        VectorView view_over_v{v};
    
        // Podemos iterar com begin() e end().
        for (int n : view_over_v)
            std::cout << n << ' ';
        std::cout << '\n';
    
        // Obtemos operator[] gratuitamente ao herdar de view_interface
        // já que satisfazemos o conceito random_access_range.
        for (std::ptrdiff_t i = 0; i != view_over_v.size(); ++i)
            std::cout << "v[" << i << "] = " << view_over_v[i] << '\n';
    }
```

Saída:
```
    1 4 9 16
    v[0] = 1
    v[1] = 4
    v[2] = 9
    v[3] = 16
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento como publicado | Comportamento correto
---|---|---|---
[LWG 3549](<https://cplusplus.github.io/LWG/issue3549>) | C++20 | `view_interface` era exigido ser derivado de `view_base`, o que às vezes exigia múltiplos subobjetos `view_base` em uma view | herança removida

### Veja também

[ ranges::subrange](<#/doc/ranges/subrange>)(C++20) | combina um par iterator-sentinel em uma [`view`](<#/doc/ranges/view>)
(class template)