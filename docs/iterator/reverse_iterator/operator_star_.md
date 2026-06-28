# std::reverse_iterator&lt;Iter&gt;::operator*,-&gt;

```cpp
reference operator*() const; | (1) | (constexpr desde C++17)
  // (2)
pointer operator->() const; | | (constexpr desde C++17)
(até C++20)
constexpr pointer operator->() const
requires (std::is_pointer_v<Iter>
requires (const Iter i) { i.operator->(); });  // (desde C++20)
```

Retorna uma referência ou ponteiro para o elemento anterior a `[current](<#/doc/iterator/reverse_iterator>)`.

```cpp
Função membro | Equivalente a
operator* | Iter tmp =` `current`; return *--tmp;
operator-> | | return &(operator*());  // (até C++11)
return std::addressof(operator*());  // (desde C++11)
(até C++20)
```

*   return` `[current](<#/doc/iterator/reverse_iterator>)` `- 1; se `Iter` for um tipo ponteiro
*   return [std::prev](<#/doc/iterator/prev>)(`[current](<#/doc/iterator/reverse_iterator>)`).operator->(); caso contrário

| (desde C++20)

### Valor de retorno

Conforme descrito acima.

### Exemplo

Execute este código
```cpp
    #include <complex>
    #include <iostream>
    #include <iterator>
    #include <vector>
    
    int main()
    {
        using RI0 = std::reverse_iterator<int*>;
        int a[]{0, 1, 2, 3};
        RI0 r0{std::rbegin(a)};
        std::cout << "*r0 = " << *r0 << '\n';
        *r0 = 42;
        std::cout << "a[3] = " << a[3] << '\n';
    
        using RI1 = std::reverse_iterator<std::vector<int>::iterator>;
        std::vector<int> vi{0, 1, 2, 3};
        RI1 r1{vi.rend() - 2};
        std::cout << "*r1 = " << *r1 << '\n';
    
        using RI2 = std::reverse_iterator<std::vector<std::complex<double>>::iterator>;
        std::vector<std::complex<double>> vc{{1, 2}, {3, 4}, {5, 6}, {7, 8}};
        RI2 r2{vc.rbegin() + 1};
        std::cout << "vc[2] = (" << r2->real() << ',' << r2->imag() << ")\n";
    }
```

Saída:
```
    *r0 = 3
    a[3] = 42
    *r1 = 1
    vc[2] = (5,6)
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[LWG 2188](<https://cplusplus.github.io/LWG/issue2188>) | C++11 | operator-> usava `&` para obter o endereço | usa [std::addressof](<#/doc/memory/addressof>) em vez disso

### Ver também

[ operator[]](<#/doc/iterator/reverse_iterator/operator_at>) | acessa um elemento por índice
(função membro pública)