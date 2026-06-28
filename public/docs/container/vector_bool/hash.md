# std::hash&lt;std::vector&lt;bool&gt;&gt;

Definido no cabeçalho `[<vector>](<#/doc/header/vector>)`

```c
template< class Allocator >
struct hash<std::vector<bool, Allocator>>;
```

A especialização de template de [std::hash](<#/doc/utility/hash>) para [std::vector](<#/doc/container/vector>)&lt;bool&gt; permite aos usuários obter hashes de objetos do tipo [std::vector](<#/doc/container/vector>)&lt;bool&gt;.

### Exemplo

Execute este código
```cpp
    #include <iostream>
    #include <unordered_set>
    #include <vector>
     
    using vb = std::vector<bool>;
     
    vb to_vector_bool(unsigned n)
    {
        vb v;
        do
        {
            v.push_back(n & 1);
            n >>= 1;
        }
        while (n);
        return v;
    }
     
    auto print(const vb& v, bool new_line = true)
    {
        for (std::cout << "{ "; const bool e : v)
            std::cout << e << ' ';
        std::cout << '}' << (new_line ? '\n' : ' ');
    }
     
    int main()
    {
        for (auto i{0U}; i != 8; ++i)
        {
            std::cout << std::hex << std::uppercase;
            vb v = to_vector_bool(i);
            std::cout << std::hash<vb>{}(v) << ' ' << std::dec;
            print(v);
        }
     
        // std::hash para vector<bool> torna possível mantê-los em
        // containers associativos unordered_*, como unordered_set.
     
        std::unordered_set v{vb{0}, vb{0, 0}, vb{1}, vb{1}, vb{1, 0}, vb{1, 1}};
     
        for (vb const& e : v)
            print(e, 0);
        std::cout << '\n';
    }
```

Saída possível:
```
    6D09EE26D5863619 { 0 }
    3C27D9F591D20E49 { 1 }
    E74D3F72B7599C63 { 0 1 }
    EE3BE81F55123770 { 1 1 }
    3AAD2A2EDBEC6C35 { 0 0 1 }
    EB057F773CB64C43 { 1 0 1 }
    6E1354730102BE00 { 0 1 1 }
    E2E622597C18899D { 1 1 1 }
    { 1 1 } { 1 0 } { 1 } { 0 0 } { 0 }
```

### Veja também

[ hash](<#/doc/utility/hash>)(C++11) | objeto de função hash
(class template)