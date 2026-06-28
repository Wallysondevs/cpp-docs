# std::basic_osyncstream

Definido no cabeçalho `[<syncstream>](<#/doc/header/syncstream>)`

```c
template<
class CharT,
class Traits = std::char_traits<CharT>,
class Allocator = std::allocator<CharT>
> class basic_osyncstream : public std::basic_ostream<CharT, Traits>
```

O template de classe `std::basic_osyncstream` é um wrapper de conveniência para [`std::basic_syncbuf`](<#/doc/io/basic_syncbuf>). Ele fornece um mecanismo para sincronizar threads que escrevem no mesmo stream.

Pode ser usado com uma variável nomeada:
```cpp
    {
        std::osyncstream synced_out(std::cout); // wrapper sincronizado para std::cout
        synced_out << "Hello, ";
        synced_out << "World!";
        synced_out << std::endl; // flush é notado, mas ainda não realizado
        synced_out << "and more!\n";
    } // caracteres são transferidos e std::cout é descarregado
```

assim como com um temporário:
```cpp
    std::osyncstream(std::cout) << "Hello, " << "World!" << '\n';
```

Ele fornece a garantia de que toda a saída feita para o mesmo buffer de destino final (`std::cout` nos exemplos acima) estará livre de *data races* e não será intercalada ou corrompida de forma alguma, desde que cada escrita para esse buffer de destino final seja feita através de instâncias (possivelmente diferentes) de `std::basic_osyncstream`.

Uma implementação típica de `std::basic_osyncstream` contém apenas um membro: o `std::basic_syncbuf` encapsulado.

Diagrama de herança

Vários typedefs para tipos de caracteres comuns são fornecidos:

Definido no cabeçalho `[<syncstream>](<#/doc/header/syncstream>)`
---
Tipo | Definição
---|---
`std::osyncstream` | std::basic_osyncstream&lt;char&gt;
`std::wosyncstream` | std::basic_osyncstream<wchar_t>

### Tipos de membros

Tipo de membro | Definição
---|---
`char_type` | `CharT`
`traits_type` | `Traits`; o programa é malformado se `Traits::char_type` não for `CharT`.
`int_type` | `Traits::int_type`
`pos_type` | `Traits::pos_type`
`off_type` | `Traits::off_type`
`allocator_type` | `Allocator`
`streambuf_type ` | [std::basic_streambuf](<#/doc/io/basic_streambuf>)<CharT, Traits>
`syncbuf_type ` | [std::basic_syncbuf](<#/doc/io/basic_syncbuf>)<CharT, Traits, Allocator>

### Funções membro

[ (construtor)](<#/doc/io/basic_osyncstream/basic_osyncstream>) | constrói um objeto `basic_osyncstream`
(função membro pública)
[ operator=](<#/>) | atribui um objeto `basic_osyncstream`
(função membro pública)
[ (destrutor)](<#/doc/io/basic_osyncstream/~basic_osyncstream>) | destrói o `basic_osyncstream` e emite seu buffer interno
(função membro pública)
[ rdbuf](<#/doc/io/basic_osyncstream/rdbuf>) | obtém um ponteiro para o `basic_syncbuf` subjacente
(função membro pública)
[ get_wrapped](<#/doc/io/basic_osyncstream/get_wrapped>) | obtém um ponteiro para o buffer de stream de destino final
(função membro pública)
[ emit](<#/doc/io/basic_osyncstream/emit>) | chama [`emit()`](<#/doc/io/basic_syncbuf/emit>) no `basic_syncbuf` subjacente para transmitir seus dados internos para o destino final
(função membro pública)

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

[ sentry](<#/doc/io/basic_ostream/sentry>) | implementa a lógica básica para a preparação do stream para operações de saída
(classe membro pública de `std::basic_ostream<CharT,Traits>`)

## Herdado de [std::basic_ios](<#/doc/io/basic_ios>)

### Tipos de membros

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
[ rdstate](<#/doc/io/basic_ios/rdstate>) | retorna os flags de estado
(função membro pública de `std::basic_ios<CharT,Traits>`)
[ setstate](<#/doc/io/basic_ios/setstate>) | define os flags de estado
(função membro pública de `std::basic_ios<CharT,Traits>`)
[ clear](<#/doc/io/basic_ios/clear>) | modifica os flags de estado
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
[ flags](<#/doc/io/ios_base/flags>) | gerencia os flags de formato
(função membro pública de `std::ios_base`)
[ setf](<#/doc/io/ios_base/setf>) | define um flag de formato específico
(função membro pública de `std::ios_base`)
[ unsetf](<#/doc/io/ios_base/unsetf>) | limpa um flag de formato específico
(função membro pública de `std::ios_base`)
[ precision](<#/doc/io/ios_base/precision>) | gerencia a precisão decimal de operações de ponto flutuante
(função membro pública de `std::ios_base`)
[ width](<#/doc/io/ios_base/width>) | gerencia a largura do campo
(função membro pública de `std::ios_base`)

##### Locales

[ imbue](<#/doc/io/ios_base/imbue>) | define o locale
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

[ register_callback](<#/doc/io/ios_base/register_callback>) | registra a função de callback de evento
(função membro pública de `std::ios_base`)
[ sync_with_stdio](<#/doc/io/ios_base/sync_with_stdio>)[static] | define se as bibliotecas de E/S C++ e C são interoperáveis
(função membro estática pública de `std::ios_base`)

##### Classes membro

[ failure](<#/doc/io/ios_base/failure>) | exceção de stream
(classe membro pública de `std::ios_base`)
[ Init](<#/doc/io/ios_base/Init>) | inicializa objetos de stream padrão
(classe membro pública de `std::ios_base`)

### Tipos e constantes de membros

---
Tipo | Explicação
---|---
[ openmode](<#/doc/io/ios_base/openmode>) | tipo de modo de abertura de stream As seguintes constantes também são definidas: | Constante | Explicação
[`app`](<#/doc/io/ios_base/openmode>) | busca o fim do stream antes de cada escrita
[`binary`](<#/doc/io/ios_base/openmode>) | abre em [modo binário](<#/doc/io/c/FILE>)
[`in`](<#/doc/io/ios_base/openmode>) | abre para leitura
[`out`](<#/doc/io/ios_base/openmode>) | abre para escrita
[`trunc`](<#/doc/io/ios_base/openmode>) | descarta o conteúdo do stream ao abrir
[`ate`](<#/doc/io/ios_base/openmode>) | busca o fim do stream imediatamente após a abertura
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
[`skipws`](<#/doc/io/ios_base/fmtflags>) | pula espaços em branco iniciais antes de certas operações de entrada: veja [std::skipws](<#/doc/io/manip/skipws>)
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
[`__cpp_lib_syncbuf`](<#/doc/feature_test>) | [`201803L`](<#/>) | (C++20) | Ostream com buffer sincronizado ([`std::osyncstream`](<#/doc/io/basic_osyncstream>), std::syncbuf) e manipuladores