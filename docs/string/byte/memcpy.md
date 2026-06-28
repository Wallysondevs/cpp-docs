# std::memcpy

Definido no cabeçalho `[<cstring>](<#/doc/header/cstring>)`

```c
void* memcpy( void* dest, const void* src, std::size_t count );
```

Copia `count` bytes do objeto apontado por `src` para o objeto apontado por `dest`. Ambos os objetos são reinterpretados como arrays de `unsigned char`.

Se os objetos se sobrepõem, o comportamento é indefinido.

Se `dest` ou `src` for um [ponteiro inválido ou nulo](<#/doc/language/pointer>), o comportamento é indefinido, mesmo que `count` seja zero.

Se os objetos são [potencialmente sobrepostos](<#/doc/language/objects>) ou não são [TriviallyCopyable](<#/doc/named_req/TriviallyCopyable>), o comportamento de `memcpy` não é especificado e [pode ser indefinido](<https://stackoverflow.com/questions/29777492>).

### Parâmetros

- **dest** — ponteiro para o local de memória para onde copiar
- **src** — ponteiro para o local de memória de onde copiar
- **count** — número de bytes a copiar

### Valor de retorno

`dest`

### Observações

`std::memcpy` pode ser usado para [criar implicitamente](<#/doc/language/objects>) objetos no buffer de destino.

`std::memcpy` é projetado para ser a rotina de biblioteca mais rápida para cópia de memória para memória. Geralmente é mais eficiente do que [std::strcpy](<#/doc/string/byte/strcpy>), que deve escanear os dados que copia, ou [std::memmove](<#/doc/string/byte/memmove>), que deve tomar precauções para lidar com entradas sobrepostas.

Vários compiladores C++ transformam loops de cópia de memória adequados em chamadas para `std::memcpy`.

Onde o [aliasing estrito](<#/doc/language/objects>) proíbe examinar a mesma memória como valores de dois tipos diferentes, `std::memcpy` pode ser usado para converter os valores.

### Exemplo

Execute este código
```cpp
    #include <cstdint>
    #include <cstring>
    #include <iostream>
    
    int main()
    {
        // simple usage
        char source[] = "once upon a daydream...", dest[4];
        std::memcpy(dest, source, sizeof dest);
        std::cout << "dest[4] = {";
        for (int n{}; char c : dest)
            std::cout << (n++ ? ", " : "") << '\'' << c << "'";
        std::cout << "};\n";
    
        // reinterpreting
        double d = 0.1;
    //  std::int64_t n = *reinterpret_cast<std::int64_t*>(&d); // aliasing violation
        std::int64_t n;
        std::memcpy(&n, &d, sizeof d); // OK
    
        std::cout << std::hexfloat << d << " is " << std::hex << n
                  << " as a std::int64_t\n" << std::dec;
    
        // object creation in destination buffer
        struct S
        {
            int x{42};
            void print() const { std::cout << '{' << x << "}\n"; }
        } s;
        alignas(S) char buf[sizeof(S)];
        S* ps = new (buf) S; // placement new
        std::memcpy(ps, &s, sizeof s);
        ps->print();
    }
```

Saída:
```
    dest[4] = {'o', 'n', 'c', 'e'};
    0x1.999999999999ap-4 is 3fb999999999999a as a std::int64_t
    {42}
```

### Veja também

[ memmove](<#/doc/string/byte/memmove>) | move um buffer para outro
(função)
[ memset](<#/doc/string/byte/memset>) | preenche um buffer com um caractere
(função)
[ wmemcpy](<#/doc/string/wide/wmemcpy>) | copia uma certa quantidade de caracteres largos entre dois arrays não sobrepostos
(função)
[ copy](<#/doc/string/basic_string/copy>) | copia caracteres
(função membro pública de `std::basic_string<CharT,Traits,Allocator>`)
[ copycopy_if](<#/doc/algorithm/copy>)(desde C++11) | copia um range de elementos para um novo local
(modelo de função)
[ copy_backward](<#/doc/algorithm/copy_backward>) | copia um range de elementos em ordem inversa
(modelo de função)
[ is_trivially_copyable](<#/doc/types/is_trivially_copyable>)(desde C++11) | verifica se um tipo é trivially copyable
(modelo de classe)
[Documentação C](<#/>) para memcpy