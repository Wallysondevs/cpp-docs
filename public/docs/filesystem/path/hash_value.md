# std::filesystem::hash_value

Definido no cabeçalho `[<filesystem>](<#/doc/header/filesystem>)`

```c
std::size_t hash_value( const std::filesystem::path& p ) noexcept;
```

### Parâmetros

- **p** — um objeto [std::filesystem::path](<#/doc/filesystem/path>)

### Valor de retorno

Um valor hash tal que, se para dois caminhos, p1 == p2 então hash_value(p1) == hash_value(p2).

O valor de retorno é consistente com [`std::hash`](<#/doc/filesystem/path/hash>).

### Notas

A igualdade de dois caminhos é determinada comparando cada componente separadamente, então, por exemplo, "a//b" é igual a "a/b" e tem o mesmo `hash_value`.

`hash_value` se origina da biblioteca [Boost.filesystem](<https://www.boost.org/doc/libs/release/libs/filesystem/doc/index.htm>), onde foi usado para interoperabilidade com boost.hash (que chama `hash_value` encontrado por [argument-dependent lookup](<#/doc/language/adl>) ou [`boost::hash_value`](<https://www.boost.org/doc/libs/1_76_0/doc/html/hash/reference.html#id-1_3_11_11_2_2_27-bb>) onde disponível).

### Exemplo

Execute este código
```cpp
    #include <cassert>
    #include <cstddef>
    #include <filesystem>
    #include <iomanip>
    #include <iostream>
    #include <unordered_set>
    namespace fs = std::filesystem;
    
    void show_hash(fs::path const& p)
    {
        std::cout << std::hex << std::uppercase << std::setw(16)
                  << fs::hash_value(p) << " : " << p << '\n';
    }
    
    int main()
    {
        auto tmp1 = fs::path{"/tmp"};
        auto tmp2 = fs::path{"/tmp/../tmp"};
        assert(!(tmp1 == tmp2));
        assert(fs::equivalent(tmp1, tmp2));
        show_hash(tmp1);
        show_hash(tmp2);
    
        for (auto s : {"/a///b", "/a//b", "/a/c", "...", "..", ".", ""})
            show_hash(s);
    
        // A hash function object to work with unordered_* containers:
        struct PathHash
        {
            std::size_t operator()(fs::path const& p) const noexcept
            {
                return fs::hash_value(p);
            }
        };
        std::unordered_set<fs::path, PathHash> dirs{
            "/bin", "/bin", "/lib", "/lib", "/opt", "/opt", "/tmp", "/tmp/../tmp"};
        for (fs::path const& p : dirs)
            std::cout << p << ' ';
        std::cout << '\n';
    }
```

Saída possível:
```
    6050C47ADB62DFE5 : "/tmp"
    62795A58B69AD90A : "/tmp/../tmp"
    FF302110C9991974 : "/a///b"
    FF302110C9991974 : "/a//b"
    FD6167277915D464 : "/a/c"
    C42040F82CD8B542 : "..."
    D2D30154E0B78BBC : ".."
    D18C722215ED0530 : "."
                   0 : ""
    "/tmp/../tmp" "/opt" "/lib" "/tmp" "/bin"
```

### Ver também

[ compare](<#/doc/filesystem/path/compare>) | compara as representações lexicais de dois caminhos lexicograficamente
(função membro pública)
[ operator==operator!=operator<operator<=operator>operator>=operator<=>](<#/doc/filesystem/path/operator_cmp>)(C++17)(C++17)(até C++20)(C++17)(até C++20)(C++17)(até C++20)(C++17)(até C++20)(C++17)(até C++20)(C++20) | compara lexicograficamente dois caminhos
(função)
[ equivalent](<#/doc/filesystem/equivalent>)(C++17) | verifica se dois caminhos se referem ao mesmo objeto do sistema de arquivos
(função)
[ hash](<#/doc/utility/hash>)(C++11) | objeto de função hash
(modelo de classe)
[ std::hash<std::filesystem::path>](<#/doc/filesystem/path/hash>)(C++17) | suporte a hash para [`std::filesystem::path`](<#/doc/filesystem/path>)
(especialização de modelo de classe)