# std::basic_spanstream&lt;CharT,Traits&gt;::span

```cpp
std::span<CharT> span() const noexcept;  // (1) (desde C++23)
void span( std::span<CharT> s ) noexcept;  // (2) (desde C++23)
```

1) Obtém um `span` que referencia a área escrita se [std::ios_base::out](<#/doc/io/ios_base/openmode>) estiver definido no modo de abertura do `std::basic_spanbuf` encapsulado, ou um `span` que referencia o buffer subjacente, caso contrário.

2) Faz com que o `std::basic_spanbuf` encapsulado realize E/S no buffer referenciado por `s`.

### Parâmetros

- **s** — `std::span` que referencia o armazenamento a ser usado como o novo buffer subjacente do stream

### Valor de retorno

1) Um `std::span` que referencia o buffer subjacente ou a área escrita, dependendo do modo de abertura do `std::basic_spanbuf` encapsulado.

2) (nenhum)

### Exemplo

Execute este código
```cpp
    #include <cassert>
    #include <iostream>
    #include <span>
    #include <spanstream>
    
    int main()
    {
        char out_buf[16];
        std::ospanstream ost{std::span<char>{out_buf}};
        ost << "C++" << ' ' << 23 << '\0'; // note explicit null-termination
        auto sp = ost.span();
        assert(
            sp[0] == 'C' && sp[1] == '+' && sp[2] == '+' &&
            sp[3] == ' ' && sp[4] == '2' && sp[5] == '3' &&
            sp[6] == '\0'
        );
        std::cout << "sp.data(): [" << sp.data() << "]\n";
        std::cout << "out_buf: [" << out_buf << "]\n";
        // spanstream uses out_buf as internal storage, no allocations
        assert(static_cast<char*>(out_buf) == sp.data());
    
        const char in_buf[] = "X Y 42";
        std::ispanstream ist{std::span<const char>{in_buf}};
        assert(static_cast<const char*>(in_buf) == ist.span().data());
        char c;
        ist >> c;
        assert(c == 'X');
        ist >> c;
        assert(c == 'Y');
        int i;
        ist >> i;
        assert(i == 42);
        ist >> i; // buffer is exhausted
        assert(!ist);
    }
```

Saída:
```
    sp.data(): [C++ 23]
    out_buf: [C++ 23]
```

### Veja também

[ span](<#/doc/io/basic_spanbuf/span>) | obtém ou inicializa um buffer subjacente de acordo com o modo
(função membro pública de `std::basic_spanbuf<CharT,Traits>`)