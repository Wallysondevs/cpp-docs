# std::basic_ostream

Definido no cabeçalho `[<ostream>](<#/doc/header/ostream>)`

```c
template<
class CharT,
class Traits = std::char_traits<CharT>
> class basic_ostream : virtual public std::basic_ios<CharT, Traits>
```

O template de classe `basic_ostream` fornece suporte para operações de saída de alto nível em streams de caracteres. As operações suportadas incluem saída formatada (por exemplo, valores inteiros) e saída não formatada (por exemplo, caracteres brutos e arrays de caracteres). Esta funcionalidade é implementada em termos da interface fornecida pela classe `basic_streambuf`, acessada através da classe base `basic_ios`. Em implementações típicas, `basic_ostream` não possui membros de dados não herdados.

Diagrama de herança

Vários typedefs para tipos de caracteres comuns são fornecidos:

Definido no cabeçalho `[<ostream>](<#/doc/header/ostream>)`
---
Tipo | Definição
---|---
`std::ostream` | std::basic_ostream&lt;char&gt;
`std::wostream` | std::basic_ostream<wchar_t>

### Objetos globais

Seis objetos `basic_ostream` globais são fornecidos pela standard library:

Definido no cabeçalho `[<iostream>](<#/doc/header/iostream>)`
---
[ coutwcout](<#/doc/io/cout>) | escreve para o stream de saída C padrão [stdout](<#/doc/io/c/std_streams>)
(objeto global)
[ cerrwcerr](<#/doc/io/cerr>) | escreve para o stream de erro C padrão [stderr](<#/doc/io/c/std_streams>), sem buffer
(objeto global)
[ clogwclog](<#/doc/io/clog>) | escreve para o stream de erro C padrão [stderr](<#/doc/io/c/std_streams>)
(objeto global)

### Tipos membro

Tipo membro | Definição
---|---
`char_type` | `CharT`
`traits_type` | `Traits`; o programa é malformado se `Traits::char_type` não for `CharT`.
`int_type` | `Traits::int_type`
`pos_type` | `Traits::pos_type`
`off_type` | `Traits::off_type`

### Funções membro

[ (construtor)](<#/doc/io/basic_ostream/basic_ostream>) | constrói o objeto
(função membro pública)
[ (destrutor)](<#/doc/io/basic_ostream/~basic_ostream>)[virtual] | destrói o objeto
(função membro pública virtual)
[ operator=](<#/>)(C++11) | move-atribui de outro `basic_ostream`
(função membro protegida)

##### Saída formatada

[ operator<<](<#/doc/io/basic_ostream/operator_ltlt>) | insere dados formatados
(função membro pública)

##### Saída não formatada

[ put](<#/doc/io/basic_ostream/put>) | insere um caractere
(função membro pública)
[ write](<#/doc/io/basic_ostream/write>) | insere blocos de caracteres
(função membro pública)

##### Posicionamento

[ tellp](<#/doc/io/basic_ostream/tellp>) | retorna o indicador de posição de saída
(função membro pública)
[ seekp](<#/doc/io/basic_ostream/seekp>) | define o indicador de posição de saída
(função membro pública)

##### Diversos

[ flush](<#/doc/io/basic_ostream/flush>) | sincroniza com o dispositivo de armazenamento subjacente
(função membro pública)
[ swap](<#/doc/io/basic_ostream/swap>)(C++11) | troca objetos stream, exceto pelo buffer associado
(função membro protegida)

### Classes membro

[ sentry](<#/doc/io/basic_ostream/sentry>) | implementa lógica básica para a preparação do stream para operações de saída
(classe membro pública)

### Funções não membro

[ operator<<(std::basic_ostream)](<#/doc/io/basic_ostream/operator_ltlt2>) | insere dados de caracteres ou insere em stream rvalue
(template de função)
[ print(std::ostream)](<#/doc/io/basic_ostream/print>)(C++23) | produz a representação [formatada](<#/doc/utility/format>) dos argumentos
(template de função)
[ println(std::ostream)](<#/doc/io/basic_ostream/println>)(C++23) | produz a representação [formatada](<#/doc/utility/format>) dos argumentos com '\n' anexado
(template de função)
[ vprint_unicode(std::ostream)](<#/doc/io/basic_ostream/vprint_unicode>)(C++23) | realiza saída ciente de Unicode usando representação de argumento com [type-erasure](<#/doc/utility/format/basic_format_args>)
(função)
[ vprint_nonunicode(std::ostream)](<#/doc/io/basic_ostream/vprint_nonunicode>)(C++23) | produz dados de caracteres usando representação de argumento com [type-erasure](<#/doc/utility/format/basic_format_args>)
(função)

## Herdado de [std::basic_ios](<#/doc/io/basic_ios>)

### Tipos membro

Tipo membro | Definição
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
[ imbue](<#/doc/io/basic_ios/imbue>) | define o locale
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
[ setf](<#/doc/io/ios_base/setf>) | define flag de formato específica
(função membro pública de `std::ios_base`)
[ unsetf](<#/doc/io/ios_base/unsetf>) | limpa flag de formato específica
(função membro pública de `std::ios_base`)
[ precision](<#/doc/io/ios_base/precision>) | gerencia a precisão decimal de operações de ponto flutuante
(função membro pública de `std::ios_base`)
[ width](<#/doc/io/ios_base/width>) | gerencia a largura do campo
(função membro pública de `std::ios_base`)

##### Locales

[ imbue](<#/doc/io/ios_base/imbue>) | define locale
(função membro pública de `std::ios_base`)
[ getloc](<#/doc/io/ios_base/getloc>) | retorna o locale atual
(função membro pública de `std::ios_base`)

##### Array extensível interno

[ xalloc](<#/doc/io/ios_base/xalloc>)[static] | retorna um inteiro único em todo o programa que é seguro para usar como índice para [`pword()`](<#/doc/io/ios_base/pword>) e [`iword()`](<#/doc/io/ios_base/iword>)
(função membro estática pública de `std::ios_base`)
[ iword](<#/doc/io/ios_base/iword>) | redimensiona o armazenamento privado se necessário e acessa o elemento long no índice fornecido
(função membro pública de `std::ios_base`)
[ pword](<#/doc/io/ios_base/pword>) | redimensiona o armazenamento privado se necessário e acessa o elemento void* no índice fornecido
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

### Tipos e constantes membro

---
Tipo | Explicação
---|---
[ openmode](<#/doc/io/ios_base/openmode>) | tipo de modo de abertura de stream As seguintes constantes também são definidas: | Constante | Explicação
[`app`](<#/doc/io/ios_base/openmode>) | posiciona no final do stream antes de cada escrita
[`binary`](<#/doc/io/ios_base/openmode>) | abre em [modo binário](<#/doc/io/c/FILE>)
[`in`](<#/doc/io/ios_base/openmode>) | abre para leitura
[`out`](<#/doc/io/ios_base/openmode>) | abre para escrita
[`trunc`](<#/doc/io/ios_base/openmode>) | descarta o conteúdo do stream ao abrir
[`ate`](<#/doc/io/ios_base/openmode>) | posiciona no final do stream imediatamente após abrir
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
[`internal`](<#/doc/io/ios_base/fmtflags>) | ajuste interno (adiciona caracteres de preenchimento ao ponto designado interno): veja [std::internal](<#/doc/io/manip/left>)
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
[`end`](<#/doc/io/ios_base/seekdir>) | o final de um stream
[`cur`](<#/doc/io/ios_base/seekdir>) | a posição atual do indicador de posição do stream

(typedef)
[ event](<#/doc/io/ios_base/event>) | especifica o tipo de evento
(enum)
[ event_callback](<#/doc/io/ios_base/event_callback>) | tipo de função de callback
(typedef)