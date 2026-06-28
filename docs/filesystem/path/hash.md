# std::hash&lt;std::filesystem::path&gt;

Definido no cabeçalho `[<filesystem>](<#/doc/header/filesystem>)`

```c
template<>
struct hash<std::filesystem::path>;
```

A especialização de template de [std::hash](<#/doc/utility/hash>) para [std::filesystem::path](<#/doc/filesystem/path>) permite aos usuários obter valores hash de [std::filesystem::path](<#/doc/filesystem/path>).

O operator() desta especialização é noexcept. Para cada valor [std::filesystem::path](<#/doc/filesystem/path>) `p`, [std::hash](<#/doc/utility/hash>)<[std::filesystem::path](<#/doc/filesystem/path>)>{}(p) é igual a std::filesystem::hash_value(p).

Esta especialização estava ausente da publicação do padrão C++17, veja [LWG issue 3657](<https://cplusplus.github.io/LWG/issue3657>).

### Exemplo

Execute este código
```
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
                  << std::hash<fs::path>{}(p) << " : " << p << '\n';
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

        std::unordered_set<fs::path, std::hash<fs::path>> dirs{
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

### Veja também

[ hash](<#/doc/utility/hash>)(C++11) | objeto de função hash
(class template)
[ hash_value](<#/doc/filesystem/path/hash_value>)(C++17) | calcula um valor hash para um objeto path
(function)