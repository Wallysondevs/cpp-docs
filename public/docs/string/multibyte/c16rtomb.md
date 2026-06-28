# std::c16rtomb

Definido no cabeçalho `[<cuchar>](<#/doc/header/cuchar>)`

```c
std::size_t c16rtomb( char* s, char16_t c16, std::mbstate_t* ps );
```

Converte um único ponto de código de uma representação de caractere de 16 bits de comprimento variável (tipicamente, UTF-16) para uma representação de caractere multibyte estreita.

Se s não for um ponteiro nulo e c16 for a última unidade de código de 16 bits em uma codificação de comprimento variável válida de um ponto de código, a função determina o número de bytes necessários para armazenar a representação de caractere multibyte desse ponto de código (incluindo quaisquer sequências de mudança, e levando em consideração o estado de conversão multibyte atual *ps), e armazena a representação de caractere multibyte no array de caracteres cujo primeiro elemento é apontado por s, atualizando *ps conforme necessário. No máximo MB_CUR_MAX bytes podem ser escritos por esta função.

Se s for um ponteiro nulo, a chamada é equivalente a std::c16rtomb(buf, u'\0', ps) para algum buffer interno `buf`.

Se c16 não for a unidade de código final em uma representação de 16 bits de um caractere largo, ela não escreve no array apontado por s, apenas *ps é atualizado.

Se c16 for o caractere largo nulo u'\0', um byte nulo é armazenado, precedido por qualquer sequência de mudança necessária para restaurar o estado de mudança inicial e o parâmetro de estado de conversão *ps é atualizado para representar o estado de mudança inicial.

A codificação multibyte usada por esta função é especificada pela locale C atualmente ativa.

### Parâmetros

- **s** — ponteiro para o array de caracteres estreitos onde o caractere multibyte será armazenado
- **c16** — o caractere de 16 bits a ser convertido
- **ps** — ponteiro para o objeto de estado de conversão usado ao interpretar a string multibyte

### Valor de retorno

Em caso de sucesso, retorna o número de bytes (incluindo quaisquer sequências de mudança) escritos no array de caracteres cujo primeiro elemento é apontado por s. Este valor pode ser ​0​, por exemplo, ao processar o primeiro char16_t em um par substituto.

Em caso de falha (se c16 não for um caractere de 16 bits válido), retorna -1, armazena [EILSEQ](<#/doc/error/errno_macros>) em [errno](<#/doc/error/errno>), e deixa *ps em estado não especificado.

### Notas

O padrão C++ se refere ao padrão C para a semântica desta função. No C11, conforme publicado, ao contrário de [std::mbrtoc16](<#/doc/string/multibyte/mbrtoc16>), que converte multibyte de largura variável (como UTF-8) para codificação de 16 bits de largura variável (como UTF-16), esta função só pode converter codificação de 16 bits de unidade única, o que significa que ela não pode converter UTF-16 para UTF-8, apesar de ser a intenção original desta função. Isso foi corrigido pelo relatório de defeito pós-C11 [DR488](<https://open-std.org/JTC1/SC22/WG14/www/docs/n2059.htm#dr_488>).

### Exemplo

O exemplo assume que a correção para o [relatório de defeito 488](<https://open-std.org/JTC1/SC22/WG14/www/docs/n2059.htm#dr_488>) foi aplicada.

Execute este código
```cpp
    #include <climits>
    #include <clocale>
    #include <cuchar>
    #include <iomanip>
    #include <iostream>
    #include <string_view>
    
    int main()
    {
        std::setlocale(LC_ALL, "en_US.utf8");
        std::u16string_view strv = u"zß水🍌"; // or z\u00df\u6c34\U0001F34C
        std::cout << "Processing " << strv.size() << " UTF-16 code units: [ ";
        for (char16_t c : strv)
            std::cout << std::showbase << std::hex << static_cast<int>(c) << ' ';
        std::cout << "]\n";
    
        std::mbstate_t state{};
        char out[MB_LEN_MAX]{};
        for (char16_t c : strv)
        {
            std::size_t rc = std::c16rtomb(out, c, &state);
            std::cout << static_cast<int>(c) << " converted to [ ";
            if (rc != (std::size_t) - 1)
                for (unsigned char c8 : std::string_view{out, rc})
                    std::cout << +c8 << ' ';
            std::cout << "]\n";
        }
    }
```

Saída:
```
    Processing 5 UTF-16 code units: [ 0x7a 0xdf 0x6c34 0xd83c 0xdf4c ]
    0x7a converted to [ 0x7a ]
    0xdf converted to [ 0xc3 0x9f ]
    0x6c34 converted to [ 0xe6 0xb0 0xb4 ]
    0xd83c converted to [ ]
    0xdf4c converted to [ 0xf0 0x9f 0x8d 0x8c ]
```

### Veja também

[ mbrtoc16](<#/doc/string/multibyte/mbrtoc16>)(C++11) | converte um caractere multibyte estreito para codificação UTF-16
(função)
[ c8rtomb](<#/doc/string/multibyte/c8rtomb>)(C++20) | converte string UTF-8 para codificação multibyte estreita
(função)
[ do_out](<#/doc/locale/codecvt/out>)[virtual] | converte uma string de `InternT` para `ExternT`, como ao escrever em um arquivo
(função membro virtual protegida de `std::codecvt<InternT,ExternT,StateT>`)
[Documentação C](<#/>) para c16rtomb