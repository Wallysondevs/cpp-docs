# std::basic_fstream

Definido no cabeçalho `[<fstream>](<#/doc/header/fstream>)`

```c
template<
class CharT,
class Traits = std::char_traits<CharT>
> class basic_fstream : public std::basic_iostream<CharT, Traits>
```

O template de classe `basic_fstream` implementa operações de entrada/saída de alto nível em streams baseados em arquivo. Ele interage com um streambuffer baseado em arquivo ([std::basic_filebuf](<#/doc/io/basic_filebuf>)) e a interface de alto nível de ([std::basic_iostream](<#/doc/io/basic_iostream>)).

Uma implementação típica de `std::basic_fstream` contém apenas um membro de dados não derivado: uma instância de [std::basic_filebuf](<#/doc/io/basic_filebuf>)<CharT, Traits>.

Diagrama de herança

Vários typedefs para tipos de caracteres comuns são fornecidos:

Definido no cabeçalho `[<fstream>](<#/doc/header/fstream>)`
---
Tipo | Definição
---|---
`std::fstream` | std::basic_fstream&lt;char&gt;
`std::wfstream` | std::basic_fstream<wchar_t>

### Tipos de membro

Tipo de membro | Definição
---|---
`char_type` | `CharT`
`traits_type` | `Traits`; o programa é malformado se `Traits::char_type` não for `CharT`.
`int_type` | `Traits::int_type`
`pos_type` | `Traits::pos_type`
`off_type` | `Traits::off_type`
`native_handle_type`(C++26) | tipo _definido pela implementação_ que é [TriviallyCopyable](<#/doc/named_req/TriviallyCopyable>) e [`semiregular`](<#/doc/concepts/semiregular>)

### Funções membro

[ (construtor)](<#/doc/io/basic_fstream/basic_fstream>) | constrói o stream de arquivo
(função membro pública)
(destrutor)[virtual] (declarado implicitamente) | destrói o `basic_fstream` e o buffer associado, fecha o arquivo
(função membro pública virtual)
[ operator=](<#/>)(desde C++11) | move o stream de arquivo
(função membro pública)
[ swap](<#/doc/io/basic_fstream/swap>)(desde C++11) | troca dois streams de arquivo
(função membro pública)
[ rdbuf](<#/doc/io/basic_fstream/rdbuf>) | retorna o objeto de dispositivo de arquivo bruto subjacente
(função membro pública)
[ native_handle](<#/doc/io/basic_fstream/native_handle>)(C++26) | retorna o handle subjacente definido pela implementação
(função membro pública)

##### Operações de arquivo

[ is_open](<#/doc/io/basic_fstream/is_open>) | verifica se o stream tem um arquivo associado
(função membro pública)
[ open](<#/doc/io/basic_fstream/open>) | abre um arquivo e o associa ao stream
(função membro pública)
[ close](<#/doc/io/basic_fstream/close>) | fecha o arquivo associado
(função membro pública)

### Funções não membro

[ std::swap(std::basic_fstream)](<#/doc/io/basic_fstream/swap2>)(desde C++11) | especializa o algoritmo [std::swap](<#/doc/utility/swap>)
(template de função)

## Herdado de [std::basic_istream](<#/doc/io/basic_istream>)

### Funções membro

##### Entrada formatada

---
[ operator>>](<#/doc/io/basic_istream/operator_gtgt>) | extrai dados formatados
(função membro pública de `std::basic_istream<CharT,Traits>`)

##### Entrada não formatada

[ get](<#/doc/io/basic_istream/get>) | extrai caracteres
(função membro pública de `std::basic_istream<CharT,Traits>`)
[ peek](<#/doc/io/basic_istream/peek>) | lê o próximo caractere sem extraí-lo
(função membro pública de `std::basic_istream<CharT,Traits>`)
[ unget](<#/doc/io/basic_istream/unget>) | desextrai um caractere
(função membro pública de `std::basic_istream<CharT,Traits>`)
[ putback](<#/doc/io/basic_istream/putback>) | coloca um caractere no stream de entrada
(função membro pública de `std::basic_istream<CharT,Traits>`)
[ getline](<#/doc/io/basic_istream/getline>) | extrai caracteres até que o caractere dado seja encontrado
(função membro pública de `std::basic_istream<CharT,Traits>`)
[ ignore](<#/doc/io/basic_istream/ignore>) | extrai e descarta caracteres até que o caractere dado seja encontrado
(função membro pública de `std::basic_istream<CharT,Traits>`)
[ read](<#/doc/io/basic_istream/read>) | extrai blocos de caracteres
(função membro pública de `std::basic_istream<CharT,Traits>`)
[ readsome](<#/doc/io/basic_istream/readsome>) | extrai blocos de caracteres já disponíveis
(função membro pública de `std::basic_istream<CharT,Traits>`)
[ gcount](<#/doc/io/basic_istream/gcount>) | retorna o número de caracteres extraídos pela última operação de entrada não formatada
(função membro pública de `std::basic_istream<CharT,Traits>`)

##### Posicionamento

[ tellg](<#/doc/io/basic_istream/tellg>) | retorna o indicador de posição de entrada
(função membro pública de `std::basic_istream<CharT,Traits>`)
[ seekg](<#/doc/io/basic_istream/seekg>) | define o indicador de posição de entrada
(função membro pública de `std::basic_istream<CharT,Traits>`)

##### Diversos

[ sync](<#/doc/io/basic_istream/sync>) | sincroniza com o dispositivo de armazenamento subjacente
(função membro pública de `std::basic_istream<CharT,Traits>`)

### Classes membro

[ sentry](<#/doc/io/basic_istream/sentry>) | implementa lógica básica para a preparação do stream para operações de entrada
(classe membro pública de `std::basic_istream<CharT,Traits>`)

## Herdado de [std::basic_ostream](<#/doc/io/basic_ostream>)

### Funções membro

##### Saída formatada

---
[ operator<<](<#/doc/io/basic_ostream/operator_ltlt>) | insere dados formatados
(função membro pública de `std::basic_ostream<CharT,Traits>`)

##### Saída não formatada

[ put](<#/doc/io/basic_ostream/put>) | insere um caractere
(função membro pública de `std::basic_ostream<CharT,Traits>`)
[ write](<#/doc/io/basic_ostream/write>) | insere blocos de caracteres
(função membro pública de `std::basic_ostream<CharT,Traits>`)

##### Posicionamento

[ tellp](<#/doc/io/basic_ostream/tellp>) | retorna o indicador de posição de saída
(função membro pública de `std::basic_ostream<CharT,Traits>`)
[ seekp](<#/doc/io/basic_ostream/seekp>) | define o indicador de posição de saída
(função membro pública de `std::basic_ostream<CharT,Traits>`)

##### Diversos

[ flush](<#/doc/io/basic_ostream/flush>) | sincroniza com o dispositivo de armazenamento subjacente
(função membro pública de `std::basic_ostream<CharT,Traits>`)

### Classes membro

[ sentry](<#/doc/io/basic_ostream/sentry>) | implementa lógica básica para a preparação do stream para operações de saída
(classe membro pública de `std::basic_ostream<CharT,Traits>`)

## Herdado de [std::basic_ios](<#/doc/io/basic_ios>)

### Tipos de membro

Tipo de membro | Definição
---|---
`char_type` | `CharT`
`traits_type` | `Traits`
`int_type` | `Traits::int_type`
`pos_type` | `Traits::pos_type`
`off_type` | `Traits::off_type`

### Funções membro

##### Funções de estado

---
[ good](<#/doc/io/basic_ios/good>) | verifica se nenhum erro ocorreu, ou seja, operações de E/S estão disponíveis
(função membro pública de `std::basic_ios<CharT,Traits>`)
[ eof](<#/doc/io/basic_ios/eof>) | verifica se o fim do arquivo foi atingido
(função membro pública de `std::basic_ios<CharT,Traits>`)
[ fail](<#/doc/io/basic_ios/fail>) | verifica se um erro ocorreu
(função membro pública de `std::basic_ios<CharT,Traits>`)
[ bad](<#/doc/io/basic_ios/bad>) | verifica se um erro não recuperável ocorreu
(função membro pública de `std::basic_ios<CharT,Traits>`)
[ operator!](<#/>) | verifica se um erro ocorreu (sinônimo de [fail()](<#/doc/io/basic_ios/fail>))
(função membro pública de `std::basic_ios<CharT,Traits>`)
[ operator bool](<#/doc/io/basic_ios/operator_bool>) | verifica se nenhum erro ocorreu (sinônimo de `!`[fail()](<#/doc/io/basic_ios/fail>))
(função membro pública de `std::basic_ios<CharT,Traits>`)
[ rdstate](<#/doc/io/basic_ios/rdstate>) | retorna flags de estado
(função membro pública de `std::basic_ios<CharT,Traits>`)
[ setstate](<#/doc/io/basic_ios/setstate>) | define flags de estado
(função membro pública de `std::basic_ios<CharT,Traits>`)
[ clear](<#/doc/io/basic_ios/clear>) | modifica flags de estado
(função membro pública de `std::basic_ios<CharT,Traits>`)

##### Formatação

[ copyfmt](<#/doc/io/basic_ios/copyfmt>) | copia informações de formatação
(função membro pública de `std::basic_ios<CharT,Traits>`)
[ fill](<#/doc/io/basic_ios/fill>) | gerencia o caractere de preenchimento
(função membro pública de `std::basic_ios<CharT,Traits>`)

##### Diversos

[ exceptions](<#/doc/io/basic_ios/exceptions>) | gerencia a máscara de exceção
(função membro pública de `std::basic_ios<CharT,Traits>`)
[ imbue](<#/doc/io/basic_ios/imbue>) | define a locale
(função membro pública de `std::basic_ios<CharT,Traits>`)
[ rdbuf](<#/doc/io/basic_ios/rdbuf>) | gerencia o buffer de stream associado
(função membro pública de `std::basic_ios<CharT,Traits>`)
[ tie](<#/doc/io/basic_ios/tie>) | gerencia o stream vinculado
(função membro pública de `std::basic_ios<CharT,Traits>`)
[ narrow](<#/doc/io/basic_ios/narrow>) | estreita caracteres
(função membro pública de `std::basic_ios<CharT,Traits>`)
[ widen](<#/doc/io/basic_ios/widen>) | alarga caracteres
(função membro pública de `std::basic_ios<CharT,Traits>`)

## Herdado de [std::ios_base](<#/doc/io/ios_base>)

### Funções membro

##### Formatação

---
[ flags](<#/doc/io/ios_base/flags>) | gerencia flags de formato
(função membro pública de `std::ios_base`)
[ setf](<#/doc/io/ios_base/setf>) | define uma flag de formato específica
(função membro pública de `std::ios_base`)
[ unsetf](<#/doc/io/ios_base/unsetf>) | limpa uma flag de formato específica
(função membro pública de `std::ios_base`)
[ precision](<#/doc/io/ios_base/precision>) | gerencia a precisão decimal de operações de ponto flutuante
(função membro pública de `std::ios_base`)
[ width](<#/doc/io/ios_base/width>) | gerencia a largura do campo
(função membro pública de `std::ios_base`)

##### Locales

[ imbue](<#/doc/io/ios_base/imbue>) | define a locale
(função membro pública de `std::ios_base`)
[ getloc](<#/doc/io/ios_base/getloc>) | retorna a locale atual
(função membro pública de `std::ios_base`)

##### Array extensível interno

[ xalloc](<#/doc/io/ios_base/xalloc>)[static] | retorna um inteiro único em todo o programa que é seguro para usar como índice para [`pword()`](<#/doc/io/ios_base/pword>) e [`iword()`](<#/doc/io/ios_base/iword>)
(função membro estática pública de `std::ios_base`)
[ iword](<#/doc/io/ios_base/iword>) | redimensiona o armazenamento privado se necessário e acessa o elemento long no índice dado
(função membro pública de `std::ios_base`)
[ pword](<#/doc/io/ios_base/pword>) | redimensiona o armazenamento privado se necessário e acessa o elemento void* no índice dado
(função membro pública de `std::ios_base`)

##### Diversos

[ register_callback](<#/doc/io/ios_base/register_callback>) | registra função de callback de evento
(função membro pública de `std::ios_base`)
[ sync_with_stdio](<#/doc/io/ios_base/sync_with_stdio>)[static] | define se as bibliotecas de E/S C++ e C são interoperáveis
(função membro estática pública de `std::ios_base`)

##### Classes membro

[ failure](<#/doc/io/ios_base/failure>) | exceção de stream
(classe membro pública de `std::ios_base`)
[ Init](<#/doc/io/ios_base/Init>) | inicializa objetos de stream padrão
(classe membro pública de `std::ios_base`)

### Tipos de membro e constantes

---
Tipo | Explicação
---|---
[ openmode](<#/doc/io/ios_base/openmode>) | tipo de modo de abertura de stream As seguintes constantes também são definidas: | Constante | Explicação
[`app`](<#/doc/io/ios_base/openmode>) | posiciona no final do stream antes de cada escrita
[`binary`](<#/doc/io/ios_base/openmode>) | abre em [modo binário](<#/doc/io/c/FILE>)
[`in`](<#/doc/io/ios_base/openmode>) | abre para leitura
[`out`](<#/doc/io/ios_base/openmode>) | abre para escrita
[`trunc`](<#/doc/io/ios_base/openmode>) | descarta o conteúdo do stream ao abrir
[`ate`](<#/doc/io/ios_base/openmode>) | posiciona no final do stream imediatamente após a abertura
[`noreplace`](<#/doc/io/ios_base/openmode>) (C++23) | abre em modo exclusivo

(typedef)
[ fmtflags](<#/doc/io/ios_base/fmtflags>) | tipo de flags de formatação As seguintes constantes também são definidas: | Constante | Explicação
---|---
[`dec`](<#/doc/io/ios_base/fmtflags>) | usa base decimal para E/S de inteiros: veja [std::dec](<#/doc/io/manip/hex>)
[`oct`](<#/doc/io/ios_base/fmtflags>) | usa base octal para E/S de inteiros: veja [std::oct](<#/doc/io/manip/hex>)
[`hex`](<#/doc/io/ios_base/fmtflags>) | usa base hexadecimal para E/S de inteiros: veja [std::hex](<#/doc/io/manip/hex>)
[`basefield`](<#/doc/io/ios_base/fmtflags>) | dec | oct | hex. Útil para operações de mascaramento
[`left`](<#/doc/io/ios_base/fmtflags>) | ajuste à esquerda (adiciona caracteres de preenchimento à direita): veja [std::left](<#/doc/io/manip/left>)
[`right`](<#/doc/io/ios_base/fmtflags>) | ajuste à direita (adiciona caracteres de preenchimento à esquerda): veja [std::right](<#/doc/io/manip/left>)
[`internal`](<#/doc/io/ios_base/fmtflags>) | ajuste interno (adiciona caracteres de preenchimento ao ponto interno designado): veja [std::internal](<#/doc/io/manip/left>)
[`adjustfield`](<#/doc/io/ios_base/fmtflags>) | left | right | internal. Útil para operações de mascaramento
[`scientific`](<#/doc/io/ios_base/fmtflags>) | gera tipos de ponto flutuante usando notação científica, ou notação hexadecimal se combinado com fixed: veja [std::scientific](<#/doc/io/manip/fixed>)
[`fixed`](<#/doc/io/ios_base/fmtflags>) | gera tipos de ponto flutuante usando notação fixa, ou notação hexadecimal se combinado com scientific: veja [std::fixed](<#/doc/io/manip/fixed>)
[`floatfield`](<#/doc/io/ios_base/fmtflags>) | scientific | fixed. Útil para operações de mascaramento
[`boolalpha`](<#/doc/io/ios_base/fmtflags>) | insere e extrai tipo bool em formato alfanumérico: veja [std::boolalpha](<#/doc/io/manip/boolalpha>)
[`showbase`](<#/doc/io/ios_base/fmtflags>) | gera um prefixo indicando a base numérica para saída de inteiros, requer o indicador de moeda em E/S monetária: veja [std::showbase](<#/doc/io/manip/showbase>)
[`showpoint`](<#/doc/io/ios_base/fmtflags>) | gera um caractere de ponto decimal incondicionalmente para saída de números de ponto flutuante: veja [std::showpoint](<#/doc/io/manip/showpoint>)
[`showpos`](<#/doc/io/ios_base/fmtflags>) | gera um caractere + para saída numérica não negativa: veja [std::showpos](<#/doc/io/manip/showpos>)
[`skipws`](<#/doc/io/ios_base/fmtflags>) | ignora espaços em branco iniciais antes de certas operações de entrada: veja [std::skipws](<#/doc/io/manip/skipws>)
[`unitbuf`](<#/doc/io/ios_base/fmtflags>) | descarrega a saída após cada operação de saída: veja [std::unitbuf](<#/doc/io/manip/unitbuf>)
[`uppercase`](<#/doc/io/ios_base/fmtflags>) | substitui certas letras minúsculas por seus equivalentes maiúsculos em certas operações de saída: veja [std::uppercase](<#/doc/io/manip/uppercase>)

(typedef)
[ iostate](<#/doc/io/ios_base/iostate>) | tipo de estado do stream As seguintes constantes também são definidas: | Constante | Explicação
---|---
[`goodbit`](<#/doc/io/ios_base/iostate>) | nenhum erro
[`badbit`](<#/doc/io/ios_base/iostate>) | erro de stream irrecuperável
[`failbit`](<#/doc/io/ios_base/iostate>) | operação de entrada/saída falhou (erro de formatação ou extração)
[`eofbit`](<#/doc/io/ios_base/iostate>) | sequência de entrada associada atingiu o fim do arquivo

(typedef)
[ seekdir](<#/doc/io/ios_base/seekdir>) | tipo de direção de busca As seguintes constantes também são definidas: | Constante | Explicação
---|---
[`beg`](<#/doc/io/ios_base/seekdir>) | o início de um stream
[`end`](<#/doc/io/ios_base/seekdir>) | o fim de um stream
[`cur`](<#/doc/io/ios_base/seekdir>) | a posição atual do indicador de posição do stream

(typedef)
[ event](<#/doc/io/ios_base/event>) | especifica o tipo de evento
(enum)
[ event_callback](<#/doc/io/ios_base/event_callback>) | tipo de função de callback
(typedef)

### Notas

Macro de teste de recurso | Valor | Padrão | Recurso
---|---|---|---
[`__cpp_lib_fstream_native_handle`](<#/doc/feature_test>) | [`202306L`](<#/>) | (C++26) | suporte a handles nativos

### Exemplo

Execute este código
```cpp
    #include <fstream>
    #include <iostream>
    #include <string>
    
    int main()
    {
        std::string filename{"test.bin"};
        std::fstream s{filename, s.binary | s.trunc | s.in | s.out};
    
        if (!s.is_open())
            std::cout << "failed to open " << filename << '\n';
        else
        {
            // escrever
            double d{3.14};
            s.write(reinterpret_cast<char*>(&d), sizeof d); // saída binária
            s << 123 << "abc";                              // saída de texto
    
            // para fstream, isso move o ponteiro de posição do arquivo (tanto de escrita quanto de leitura)
            s.seekp(0);
    
            // ler
            d = 2.71828;
            s.read(reinterpret_cast<char*>(&d), sizeof d); // entrada binária
            int n;
            std::string str;
            if (s >> n >> str)                             // entrada de texto
                std::cout << "read back from file: " << d << ' ' << n << ' ' << str << '\n';
        }
    }
```

Saída:
```
    read back from file: 3.14 123 abc
```

### Veja também

[ getline](<#/doc/string/basic_string/getline>) | lê dados de um stream de E/S para uma string
(template de função)