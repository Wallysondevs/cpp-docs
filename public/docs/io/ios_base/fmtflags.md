# std::ios_base::fmtflags

typedef /*implementation defined*/ fmtflags;
static constexpr fmtflags dec = /*implementation defined*/  
static constexpr fmtflags oct = /*implementation defined*/  
static constexpr fmtflags hex = /*implementation defined*/  
static constexpr fmtflags basefield = dec | oct | hex;
static constexpr fmtflags left = /*implementation defined*/  
static constexpr fmtflags right = /*implementation defined*/  
static constexpr fmtflags internal = /*implementation defined*/  
static constexpr fmtflags adjustfield = left | right | internal;
static constexpr fmtflags scientific = /*implementation defined*/  
static constexpr fmtflags fixed = /*implementation defined*/  
static constexpr fmtflags floatfield = scientific | fixed;
static constexpr fmtflags boolalpha = /*implementation defined*/  
static constexpr fmtflags showbase = /*implementation defined*/  
static constexpr fmtflags showpoint = /*implementation defined*/  
static constexpr fmtflags showpos = /*implementation defined*/  
static constexpr fmtflags skipws = /*implementation defined*/  
static constexpr fmtflags unitbuf = /*implementation defined*/  
static constexpr fmtflags uppercase = /*implementation defined*/

  
Especifica as flags de formatação disponíveis. É um [BitmaskType](<#/doc/named_req/BitmaskType>). As seguintes constantes são definidas: 

Constante  |  Explicação   
---|---
`dec` |  usa base decimal para E/S de inteiros: veja [std::dec](<#/doc/io/manip/hex>)  
`oct` |  usa base octal para E/S de inteiros: veja [std::oct](<#/doc/io/manip/hex>)  
`hex` |  usa base hexadecimal para E/S de inteiros: veja [std::hex](<#/doc/io/manip/hex>)  
`basefield` |  dec | oct | hex. Útil para operações de mascaramento   
`left` |  ajuste à esquerda (adiciona caracteres de preenchimento à direita): veja [std::left](<#/doc/io/manip/left>)  
`right` |  ajuste à direita (adiciona caracteres de preenchimento à esquerda): veja [std::right](<#/doc/io/manip/left>)  
`internal` |  ajuste interno (adiciona caracteres de preenchimento ao ponto interno designado): veja [std::internal](<#/doc/io/manip/left>)  
`adjustfield` |  left | right | internal. Útil para operações de mascaramento   
`scientific` |  gera tipos de ponto flutuante usando notação científica, ou notação hexadecimal se combinado com fixed: veja [std::scientific](<#/doc/io/manip/fixed>)  
`fixed` |  gera tipos de ponto flutuante usando notação fixa, ou notação hexadecimal se combinado com scientific: veja [std::fixed](<#/doc/io/manip/fixed>)  
`floatfield` |  scientific | fixed. Útil para operações de mascaramento   
`boolalpha` |  insere e extrai tipo bool em formato alfanumérico: veja [std::boolalpha](<#/doc/io/manip/boolalpha>)  
`showbase` |  gera um prefixo indicando a base numérica para saída de inteiros, requer o indicador de moeda em E/S monetária: veja [std::showbase](<#/doc/io/manip/showbase>)  
`showpoint` |  gera um caractere de ponto decimal incondicionalmente para saída de números de ponto flutuante: veja [std::showpoint](<#/doc/io/manip/showpoint>)  
`showpos` |  gera um caractere + para saída numérica não negativa: veja [std::showpos](<#/doc/io/manip/showpos>)  
`skipws` |  ignora espaços em branco iniciais antes de certas operações de entrada: veja [std::skipws](<#/doc/io/manip/skipws>)  
`unitbuf` |  descarrega a saída após cada operação de saída: veja [std::unitbuf](<#/doc/io/manip/unitbuf>)  
`uppercase` |  substitui certas letras minúsculas por seus equivalentes maiúsculos em certas operações de saída: veja [std::uppercase](<#/doc/io/manip/uppercase>)  
  
### Exemplo

O exemplo a seguir mostra várias maneiras diferentes de imprimir o mesmo resultado.

Run this code
```cpp
    #include <iostream>
     
    int main()
    {
        const int num = 150;
     
        // using fmtflags as class member constants:
        std::cout.setf(std::ios_base::hex, std::ios_base::basefield);
        std::cout.setf(std::ios_base::showbase);
        std::cout << num << '\n';
     
        // using fmtflags as inherited class member constants:
        std::cout.setf (std::ios::hex, std::ios::basefield);
        std::cout.setf (std::ios::showbase);
        std::cout << num << '\n';
     
        // using fmtflags as object member constants:
        std::cout.setf(std::cout.hex, std::cout.basefield);
        std::cout.setf(std::cout.showbase);
        std::cout << num << '\n';
     
        // using fmtflags as a type:
        std::ios_base::fmtflags ff;
        ff = std::cout.flags();
        ff &= ~std::cout.basefield;   // unset basefield bits
        ff |= std::cout.hex;          // set hex
        ff |= std::cout.showbase;     // set showbase
        std::cout.flags(ff);
        std::cout << num << '\n';
     
        // not using fmtflags, but using manipulators:
        std::cout << std::hex << std::showbase << num << '\n';
    }
```

Saída: 
```
    0x96
    0x96
    0x96
    0x96
    0x96
```

### Veja também

[ flags](<#/doc/io/ios_base/flags>) |  gerencia flags de formato   
(função membro pública)  
[ setf](<#/doc/io/ios_base/setf>) |  define uma flag de formato específica   
(função membro pública)  
[ unsetf](<#/doc/io/ios_base/unsetf>) |  limpa uma flag de formato específica   
(função membro pública)  
[ setbase](<#/doc/io/manip/setbase>) |  altera a base usada para E/S de inteiros   
(função)  
[ setfill](<#/doc/io/manip/setfill>) |  altera o caractere de preenchimento   
(template de função)  
[ fixedscientifichexfloatdefaultfloat](<#/doc/io/manip/fixed>)(desde C++11)(desde C++11) |  altera a formatação usada para E/S de ponto flutuante   
(função)  
[ showbasenoshowbase](<#/doc/io/manip/showbase>) |  controla se um prefixo é usado para indicar a base numérica   
(função)  
[ boolalphanoboolalpha](<#/doc/io/manip/boolalpha>) |  alterna entre a representação textual e numérica de booleanos   
(função)  
[ showposnoshowpos](<#/doc/io/manip/showpos>) |  controla se o sinal `+` é usado com números não negativos   
(função)  
[ showpointnoshowpoint](<#/doc/io/manip/showpoint>) |  controla se o ponto decimal é sempre incluído na representação de ponto flutuante   
(função)  
[ unitbufnounitbuf](<#/doc/io/manip/unitbuf>) |  controla se a saída é descarregada após cada operação   
(função)  
[ skipwsnoskipws](<#/doc/io/manip/skipws>) |  controla se espaços em branco iniciais são ignorados na entrada   
(função)  
[ uppercasenouppercase](<#/doc/io/manip/uppercase>) |  controla se caracteres maiúsculos são usados com alguns formatos de saída   
(função)