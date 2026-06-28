# std::memset

Definido no header `[<cstring>](<#/doc/header/cstring>)`

```cpp
void* memset( void* dest, int ch, std::size_t count );
```

Copia o valor static_cast&lt;unsigned char&gt;(ch) para cada um dos primeiros count caracteres do objeto apontado por dest. Se o objeto é um [subobjeto potencialmente sobreposto](<#/doc/language/objects>) ou não é [TriviallyCopyable](<#/doc/named_req/TriviallyCopyable>) (por exemplo, escalar, struct compatível com C, ou um array de tipo trivially copyable), o comportamento é indefinido. Se count for maior que o tamanho do objeto apontado por dest, o comportamento é indefinido.

### Parâmetros

- **dest** — ponteiro para o objeto a ser preenchido
- **ch** — byte de preenchimento
- **count** — número de bytes a serem preenchidos

### Valor de retorno

dest

### Observações

`std::memset` pode ser otimizado (sob as regras [as-if](<#/doc/language/as_if>)) se o objeto modificado por esta função não for acessado novamente pelo resto de sua vida útil (por exemplo, [bug 8537 do gcc](<https://gcc.gnu.org/bugzilla/show_bug.cgi?id=8537>)). Por essa razão, esta função não pode ser usada para limpar memória (por exemplo, para preencher um array que armazenou uma senha com zeros).

Soluções para isso incluem [`std::fill`](<#/doc/algorithm/fill>) com ponteiros voláteis, (C23) [`memset_explicit()`](<#/>), (C11) [`memset_s`](<#/>), FreeBSD [explicit_bzero](<https://www.freebsd.org/cgi/man.cgi?query=explicit_bzero>) ou Microsoft [`SecureZeroMemory`](<https://msdn.microsoft.com/en-us/library/windows/desktop/aa366877.aspx>).

### Exemplo

Execute este código
```cpp
    #include <bitset>
    #include <climits>
    #include <cstring>
    #include <iostream>
    
    int main()
    {
        int a[4];
        using bits = std::bitset<sizeof(int) * CHAR_BIT>;
        std::memset(a, 0b1111'0000'0011, sizeof a);
        for (int ai : a)
            std::cout << bits(ai) << '\n';
    }
```

Saída:
```
    00000011000000110000001100000011
    00000011000000110000001100000011
    00000011000000110000001100000011
    00000011000000110000001100000011
```

### Veja também

[ memcpy](<#/doc/string/byte/memcpy>) | copia um buffer para outro
(função)
[ memmove](<#/doc/string/byte/memmove>) | move um buffer para outro
(função)
[ wmemset](<#/doc/string/wide/wmemset>) | copia o caractere largo fornecido para cada posição em um array de caracteres largos
(função)
[ fill](<#/doc/algorithm/fill>) | atribui por cópia o valor fornecido a cada elemento em um range
(modelo de função)
[ fill_n](<#/doc/algorithm/fill_n>) | atribui por cópia o valor fornecido a N elementos em um range
(modelo de função)
[ is_trivially_copyable](<#/doc/types/is_trivially_copyable>)(C++11) | verifica se um tipo é trivially copyable
(modelo de classe)
[Documentação C](<#/>) para memset