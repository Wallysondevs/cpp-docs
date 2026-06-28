# std::c32rtomb

Definido no cabeçalho `[<cuchar>](<#/doc/header/cuchar>)`

```c
std::size_t c32rtomb( char* s, char32_t c32, std::mbstate_t* ps );
```

Converte um caractere UTF-32 para sua representação multibyte estreita.

Se s não for um ponteiro nulo, a função determina o número de bytes necessários para armazenar a representação de caractere multibyte de c32 (incluindo quaisquer sequências de mudança, e levando em conta o estado de conversão multibyte atual *ps), e armazena a representação de caractere multibyte no array de caracteres cujo primeiro elemento é apontado por s, atualizando *ps conforme necessário. No máximo MB_CUR_MAX bytes podem ser escritos por esta função.

Se s for um ponteiro nulo, a chamada é equivalente a std::c32rtomb(buf, U'\0', ps) para algum buffer interno `buf`.

Se c32 for o caractere largo nulo U'\0', um byte nulo é armazenado, precedido por qualquer sequência de mudança necessária para restaurar o estado de mudança inicial e o parâmetro de estado de conversão *ps é atualizado para representar o estado de mudança inicial.

A codificação multibyte usada por esta função é especificada pela locale C atualmente ativa.

### Parâmetros

- **s** — ponteiro para array de caracteres estreitos onde o caractere multibyte será armazenado
- **c32** — o caractere de 32 bits a ser convertido
- **ps** — ponteiro para o objeto de estado de conversão usado ao interpretar a string multibyte

### Valor de retorno

Em caso de sucesso, retorna o número de bytes (incluindo quaisquer sequências de mudança) escritos no array de caracteres cujo primeiro elemento é apontado por s. Este valor pode ser ​0​, por exemplo, ao processar o primeiro char32_t em uma sequência de caracteres multi-char32_t (não ocorre em UTF-32).

Em caso de falha (se c32 não for um caractere de 32 bits válido), retorna -1, armazena [EILSEQ](<#/doc/error/errno_macros>) em [errno](<#/doc/error/errno>), e deixa *ps em estado não especificado.

### Exemplo

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
        std::u32string_view strv = U"zß水🍌"; // or z\u00df\u6c34\U0001F34C
        std::cout << "Processing " << strv.size() << " UTF-32 code units: [ ";
        for (char32_t c : strv)
            std::cout << std::showbase << std::hex << static_cast<int>(c) << ' ';
        std::cout << "]\n";
    
        std::mbstate_t state{};
        char out[MB_LEN_MAX]{};
        for (char32_t c : strv)
        {
            std::size_t rc = std::c32rtomb(out, c, &state);
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
    Processing 4 UTF-32 code units: [ 0x7a 0xdf 0x6c34 0x1f34c ]
    0x7a converted to [ 0x7a ]
    0xdf converted to [ 0xc3 0x9f ]
    0x6c34 converted to [ 0xe6 0xb0 0xb4 ]
    0x1f34c converted to [ 0xf0 0x9f 0x8d 0x8c ]
```

### Veja também

[ mbrtoc32](<#/doc/string/multibyte/mbrtoc32>)(desde C++11) | converte um caractere multibyte estreito para codificação UTF-32
(função)
[ do_out](<#/doc/locale/codecvt/out>)[virtual] | converte uma string de `InternT` para `ExternT`, como ao escrever em arquivo
(função membro protegida virtual de `std::codecvt<InternT,ExternT,StateT>`)
[Documentação C](<#/>) para c32rtomb