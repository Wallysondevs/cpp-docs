# std::ios_base::setf

```cpp
fmtflags setf( fmtflags flags );  // (1)
fmtflags setf( fmtflags flags, fmtflags mask );  // (2)
```

  
Define as flags de formatação para as configurações especificadas.

1) Define as flags de formatação identificadas por `flags`. Efetivamente, a seguinte operação é realizada: `fl = fl | flags`, onde `fl` define o estado das flags de formatação internas.

2) Limpa as flags de formatação sob `mask`, e define as flags limpas para aquelas especificadas por `flags`. Efetivamente, a seguinte operação é realizada: `fl = (fl & ~mask) | (flags & mask)`, onde `fl` define o estado das flags de formatação internas.

### Parâmetros

flags, mask  |  \-  |  nova configuração de formatação. `mask` define quais flags podem ser alteradas, `flags` define quais flags dentre as que serão alteradas devem ser definidas (as outras serão limpas). Ambos os parâmetros podem ser uma combinação das constantes de [flags de formatação](<#/doc/io/ios_base/setf>)   
  
##### Flags de Formatação

Constante  |  Explicação   
---|---
[`dec`](<#/doc/io/ios_base/fmtflags>) |  usa base decimal para E/S de inteiros: veja [std::dec](<#/doc/io/manip/hex>)  
[`oct`](<#/doc/io/ios_base/fmtflags>) |  usa base octal para E/S de inteiros: veja [std::oct](<#/doc/io/manip/hex>)  
[`hex`](<#/doc/io/ios_base/fmtflags>) |  usa base hexadecimal para E/S de inteiros: veja [std::hex](<#/doc/io/manip/hex>)  
[`basefield`](<#/doc/io/ios_base/fmtflags>) |  dec | oct | hex. Útil para operações de mascaramento   
[`left`](<#/doc/io/ios_base/fmtflags>) |  ajuste à esquerda (adiciona caracteres de preenchimento à direita): veja [std::left](<#/doc/io/manip/left>)  
[`right`](<#/doc/io/ios_base/fmtflags>) |  ajuste à direita (adiciona caracteres de preenchimento à esquerda): veja [std::right](<#/doc/io/manip/left>)  
[`internal`](<#/doc/io/ios_base/fmtflags>) |  ajuste interno (adiciona caracteres de preenchimento ao ponto designado interno): veja [std::internal](<#/doc/io/manip/left>)  
[`adjustfield`](<#/doc/io/ios_base/fmtflags>) |  left | right | internal. Útil para operações de mascaramento   
[`scientific`](<#/doc/io/ios_base/fmtflags>) |  gera tipos de ponto flutuante usando notação científica, ou notação hexadecimal se combinado com fixed: veja [std::scientific](<#/doc/io/manip/fixed>)  
[`fixed`](<#/doc/io/ios_base/fmtflags>) |  gera tipos de ponto flutuante usando notação fixa, ou notação hexadecimal se combinado com scientific: veja [std::fixed](<#/doc/io/manip/fixed>)  
[`floatfield`](<#/doc/io/ios_base/fmtflags>) |  scientific | fixed. Útil para operações de mascaramento   
[`boolalpha`](<#/doc/io/ios_base/fmtflags>) |  insere e extrai o tipo bool em formato alfanumérico: veja [std::boolalpha](<#/doc/io/manip/boolalpha>)  
[`showbase`](<#/doc/io/ios_base/fmtflags>) |  gera um prefixo indicando a base numérica para saída de inteiros, requer o indicador de moeda em E/S monetária: veja [std::showbase](<#/doc/io/manip/showbase>)  
[`showpoint`](<#/doc/io/ios_base/fmtflags>) |  gera um caractere de ponto decimal incondicionalmente para saída de números de ponto flutuante: veja [std::showpoint](<#/doc/io/manip/showpoint>)  
[`showpos`](<#/doc/io/ios_base/fmtflags>) |  gera um caractere + para saída numérica não negativa: veja [std::showpos](<#/doc/io/manip/showpos>)  
[`skipws`](<#/doc/io/ios_base/fmtflags>) |  ignora espaços em branco iniciais antes de certas operações de entrada: veja [std::skipws](<#/doc/io/manip/skipws>)  
[`unitbuf`](<#/doc/io/ios_base/fmtflags>) |  descarrega a saída após cada operação de saída: veja [std::unitbuf](<#/doc/io/manip/unitbuf>)  
[`uppercase`](<#/doc/io/ios_base/fmtflags>) |  substitui certas letras minúsculas por seus equivalentes maiúsculos em certas operações de saída: veja [std::uppercase](<#/doc/io/manip/uppercase>)  
  
### Valor de retorno

As flags de formatação antes da chamada à função.

### Exemplo

Execute este código
```cpp
    #include <iomanip>
    #include <iostream>
    #include <numbers>
    
    int main()
    {
        const double PI = std::numbers::pi;
        const int WIDTH = 15;
    
        std::cout.setf(std::ios::right); // equivalent: cout << right;
        std::cout << std::setw(WIDTH / 2) << "radius"
                  << std::setw(WIDTH) << "circumference" << '\n';
    
        std::cout.setf(std::ios::fixed); // equivalent: cout << fixed;
        for (double radius = 1; radius <= 6; radius += 0.5)
            std::cout << std::setprecision(1) << std::setw(WIDTH / 2)
                      << radius
                      << std::setprecision(2) << std::setw(WIDTH)
                      << (2 * PI * radius) << '\n';
    }
```

Saída: 
```
     radius  circumference
        1.0           6.28
        1.5           9.42
        2.0          12.57
        2.5          15.71
        3.0          18.85
        3.5          21.99
        4.0          25.13
        4.5          28.27
        5.0          31.42
        5.5          34.56
        6.0          37.70
```

### Veja também

[ flags](<#/doc/io/ios_base/flags>) |  gerencia flags de formato   
(função membro pública)  
[ unsetf](<#/doc/io/ios_base/unsetf>) |  limpa flag de formato específica   
(função membro pública)